const { PrismaClient } = require("@prisma/client");
const { Prisma } = require("@/utils/db");
const { serverValidation } = require("@/validator/validator");
const { authOptions } = require("../auth/[...nextauth]");
const { getServerSession } = require("next-auth/next");

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("Session", session);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    const {
      nameOfBia,
      personOfContact,
      emailOfContact,
      phBia,
      phPersonOfContact,
      active,
      addresses,
    } = req.body;

    try {
      await serverValidation.validate(req.body, { abortEarly: false });

      const existingBiaByName = await prisma.BIA.findFirst({
        where: {
          nameOfBia: nameOfBia.toLowerCase(),
        },
      });

      const existingBiaByEmail = await prisma.BIA.findFirst({
        where: {
          emailOfContact: emailOfContact.toLowerCase(),
        },
      });

      console.log("Existing BIA by Name:", existingBiaByName);
      console.log("Existing BIA by Mail:", existingBiaByEmail);

      if (existingBiaByName && existingBiaByEmail) {
        return res.status(400).json({
          error: "BIA with this name and contact email already exist",
        });
      } else if (existingBiaByName) {
        return res.status(400).json({
          error: "BIA with this name already exists",
        });
      } else if (existingBiaByEmail) {
        return res.status(400).json({
          error: "BIA with this contact email already exists",
        });
      }

      const lowerLimit = 1000000000;
      const upperLimit = 2000000000;

      let nextBIAUniqueId;

      // Generate a random value between lowerLimit and upperLimit (inclusive)
      nextBIAUniqueId =
        Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;

      // Check if the generated uniqueId already exists, and if so, generate another one
      while (
        await prisma.BIA.findFirst({
          where: {
            uniqueId: nextBIAUniqueId.toString(), // Convert to string
          },
        })
      ) {
        nextBIAUniqueId =
          Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) +
          lowerLimit;
      }

      const uniqueId = nextBIAUniqueId.toString();
      console.log("UniqueId:", uniqueId);

      const formattedAddresses = addresses.map((address) => ({
        postalCode: formatPostalCode(address.postalCode),
        province: address.province,
        city: address.city,
        street1: address.street1,
        street2: address.street2,
      }));

      const newBIA = await prisma.BIA.create({
        data: {
          uniqueId: uniqueId,
          nameOfBia,
          personOfContact,
          emailOfContact: emailOfContact.toLowerCase(),
          phBia,
          phPersonOfContact,
          active,
          addresses: {
            create: formattedAddresses,
          },
          users: {
            create: {
              name: nameOfBia,
              role: "BIA",
              active: true,
              email: emailOfContact.toLowerCase(),
            },
          },
        },
        include: {
          users: true,
        },
      });

      res.status(200).json(newBIA);
    } catch (error) {
      console.error("Error:", error);
      // Handle validation errors
      if (error.name === "ValidationError") {
        const errors = error.errors.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        res.status(400).json({ errors });
      } else {
        // Handle other errors (e.g., database errors)
        res.status(500).json({ error: error.message });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// Function to format postal code by adding a space after the first 3 characters
function formatPostalCode(postalCode) {
  return postalCode.replace(/^([A-Z]\d[A-Z])/, "$1 ").toLowerCase();
}
