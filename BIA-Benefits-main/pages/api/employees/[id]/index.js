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
      if (!session || !["SUPER_ADMIN", "BUSINESS", "BIA"].includes(session.user.role)) {
        return res
          .status(403)
          .json({ error: "Forbidden - Insufficient privileges" });
      }

      // Fetch BIA details including related addresses, users, and businesses
      const employee = await prisma.Employees.findUnique({
        where: {
          id: String(id),
        },
        include: {
          users: true,
          business: {
            select: {
              id: true,
              name: true,
              // bia:{
              //   id: true,
              //   nameOfBia: true
              // },
            },
          },

          // business:{
          //   select: {
          //       id: true,
          //       name: true,
          //   }
          // } ,
        },
      });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Failed to fetch Employee" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
