import { Prisma } from "@/utils/db";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session) {
        return res
          .status(403)
          .json({ error: "Forbidden - Insufficient privileges" });
      }

      // Fetch BIA details including related addresses, users, and businesses
      const deal = await prisma.Deal.findUnique({
        where: {
          id: String(id),
        },
        include: {
          addresses: true,
        },
      });

      if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
      }

      return res.status(200).json(deal);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Failed to fetch Business" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
