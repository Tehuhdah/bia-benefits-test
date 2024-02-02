import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Prisma } from "@/utils/db";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Retrieve the logged-in user
      const loggedInUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          business: {
            include: {
              employees: {
                include: {
                  users: true,
                },
              },
            },
          },
        },
      });

      // Extract employees associated with the logged-in business
      const employees = loggedInUser.business.employees;

      res.status(200).json(employees);
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
