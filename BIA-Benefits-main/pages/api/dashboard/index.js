import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Prisma } from "@/utils/db";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const biaCount = await prisma.bIA.count();
      const businessCount = await prisma.business.count();
      const employeeCount = await prisma.employees.count();
      const dealCount = await prisma.deal.count();

      res.status(200).json({
        biaCount,
        businessCount,
        employeeCount,
        dealCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
