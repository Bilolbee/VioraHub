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
  await ensureUser("admin@viorahub.com", "Bilol", "admin", "666");
  await ensureUser("editor@viorahub.com", "Editor", "editor", "ChangeMe123!");
  await ensureUser("reviewer@viorahub.com", "Reviewer", "reviewer", "ChangeMe123!");

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
