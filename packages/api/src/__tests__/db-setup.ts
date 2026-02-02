import { exec } from "node:child_process";
import { promisify } from "node:util";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@superdupersoftware/db";
import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

const execAsync = promisify(exec);

let container: StartedPostgreSqlContainer | null = null;
let prismaClient: PrismaClient | null = null;

export async function setupTestDatabase() {
  // Start PostgreSQL container
  container = await new PostgreSqlContainer("postgres:16")
    .withExposedPorts(5432)
    .start();

  const connectionString = container.getConnectionUri();

  // Run migrations
  await execAsync(
    `DATABASE_URL="${connectionString}" pnpm --filter @superdupersoftware/db prisma migrate deploy`,
  );

  // Create Prisma client with test database
  const adapter = new PrismaPg({ connectionString });
  prismaClient = new PrismaClient({ adapter });

  return { prismaClient, connectionString };
}

export async function teardownTestDatabase() {
  if (prismaClient) {
    await prismaClient.$disconnect();
  }
  if (container) {
    await container.stop();
  }
}

export function getTestPrismaClient() {
  if (!prismaClient) {
    throw new Error("Test database not set up. Call setupTestDatabase first.");
  }
  return prismaClient;
}
