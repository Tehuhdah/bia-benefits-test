import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Prisma } from "@/utils/db";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session || session.user.role !== "SUPER_ADMIN") {
        return res
          .status(403)
          .json({ error: "Forbidden - Insufficient privileges" });
      }
      const bias = await prisma.Deal.findMany({
        include: {
          addresses: true,
        },
      });

      res.status(200).json(bias);
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
