import type { PrismaClient } from "../../generated/prisma/client";

export async function seedUsers(db: PrismaClient) {
  await db.user.upsert({
    where: {
      email: "stephen@superdupersoftware.net",
    },
    update: {
      name: "Stephen",
      email: "stephen@superdupersoftware.net",
    },
    create: {
      name: "Stephen",
      email: "stephen@superdupersoftware.net",
    },
  });

  console.log("Seeded users");
}
