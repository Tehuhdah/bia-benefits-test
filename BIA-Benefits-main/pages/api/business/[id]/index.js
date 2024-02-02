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
      const bia = await prisma.Business.findUnique({
        where: {
          id: String(id),
        },
        include: {
          addresses: true,
          users: true,
          bia: {
            select: {
              id: true,
              addresses: true,
              // name: true,
            },
          },
          employees: {
            select: {
              id: true,
              first_name: true,
              phone: true,
              business: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                  addresses: true,
                },
              },
            },
          },
        },
      });

      if (!bia) {
        return res.status(404).json({ message: "Business not found" });
      }

      // Disconnect Prisma client after successful API call
      await prisma.$disconnect();

      return res.status(200).json(bia);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Failed to fetch Business" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
