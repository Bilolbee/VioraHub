import { randomBytes } from "crypto";
import { compare } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { Role } from "@/lib/cms-types";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "vh_session";
const sessionHours = 8;
const maxSessionsPerUser = 5;

export type AuthSession = {
  token: string;
  email: string;
  role: Role;
  name: string;
  expiresAt: Date;
};

export async function findUser(login: string, password: string) {
  const normalized = login.trim().toLowerCase();
  const user = await db.user.findFirst({
    where: {
      OR: [{ email: normalized }, { name: login.trim() }, { name: normalized }]
    }
  });
  if (!user) return null;
  const ok = await compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export async function createSessionForUser(userId: string): Promise<{ token: string; expiresAt: Date }> {
  await db.session.deleteMany({
    where: { expiresAt: { lte: new Date() } }
  });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + sessionHours * 60 * 60 * 1000);
  await db.session.create({
    data: {
      token,
      userId,
      expiresAt
    }
  });

  const sessions = await db.session.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true }
  });
  if (sessions.length > maxSessionsPerUser) {
    const toDelete = sessions.slice(maxSessionsPerUser).map((session) => session.id);
    await db.session.deleteMany({ where: { id: { in: toDelete } } });
  }

  return { token, expiresAt };
}

export async function deleteSession(token: string) {
  await db.session.deleteMany({ where: { token } });
}

function toAuthSession(row: SessionWithUser | null): AuthSession | null {
  if (!row || !row.user) return null;
  return {
    token: row.token,
    email: row.user.email,
    role: row.user.role as Role,
    name: row.user.name,
    expiresAt: row.expiresAt
  };
}

async function resolveSessionByToken(token: string | undefined | null) {
  if (!token) return null;
  const session = await db.session.findFirst({
    where: {
      token,
      expiresAt: { gt: new Date() }
    },
    include: { user: true }
  });
  return toAuthSession(session);
}

export async function readSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return resolveSessionByToken(token);
}

export async function readSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return resolveSessionByToken(token);
}

export function hasRole(userRole: Role, allowed: Role[]) {
  if (allowed.includes(userRole)) return true;
  if (userRole === "admin") return true;
  return false;
}
type SessionWithUser = Prisma.SessionGetPayload<{ include: { user: true } }>;
