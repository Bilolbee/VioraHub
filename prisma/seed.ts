import { hash } from "bcryptjs";
import { Environment, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { defaultContent } from "@/lib/cms-defaults";

async function ensureUser(email: string, name: string, role: Role, password: string) {
  const passwordHash = await hash(password, 12);
  await db.user.upsert({
    where: { email },
    update: { name, role, passwordHash },
    create: { email, name, role, passwordHash }
  });
}

async function ensureSnapshot(environment: Environment) {
  await db.contentSnapshot.upsert({
    where: { environment },
    update: {
      content: defaultContent,
      version: 1,
      updatedAt: new Date(),
      updatedBy: "system"
    },
    create: {
      environment,
      content: defaultContent,
      version: 1,
      updatedAt: new Date(),
      updatedBy: "system"
    }
  });
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@viorahub.com";
  const adminLogin = process.env.ADMIN_LOGIN || "Bilol";
  const adminPassword = process.env.ADMIN_PASSWORD || "666";
  const editorEmail = process.env.EDITOR_EMAIL || "editor@viorahub.com";
  const editorPassword = process.env.EDITOR_PASSWORD || "ChangeMe123!";
  const reviewerEmail = process.env.REVIEWER_EMAIL || "reviewer@viorahub.com";
  const reviewerPassword = process.env.REVIEWER_PASSWORD || "ChangeMe123!";

  if (process.env.NODE_ENV === "production" && adminPassword === "666") {
    throw new Error("ADMIN_PASSWORD productionda default bo'lishi mumkin emas.");
  }

  if (adminPassword === "666") {
    console.warn("Warning: ADMIN_PASSWORD default ('666'). Productionga chiqishdan oldin almashtiring.");
  }

  await ensureUser(adminEmail, adminLogin, "admin", adminPassword);
  await ensureUser(editorEmail, "Editor", "editor", editorPassword);
  await ensureUser(reviewerEmail, "Reviewer", "reviewer", reviewerPassword);

  await ensureSnapshot(Environment.staging);
  await ensureSnapshot(Environment.production);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
