import { PrismaClient } from "@prisma/client";

const globalForPrisma = PrismaClient;

//Below log flags enable or disable information in the terminal
export const Prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    errorFormat: "pretty",
    // log: ["query", "error", "info", "warn"],
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = Prisma;
