import { PrismaClient } from "@prisma/client";
import {
  randCompanyName,
  randFullName,
  randNumber,
  randRecentDate,
  randPhoneNumber,
} from "@ngneat/falso";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.clients.upsert({
    where: { id: randNumber({ min: 1, max: 1000 }) },
    update: {},
    create: {
      name: randFullName({ gender: "female" }),
      status: "Active",
      contact: parseInt(randPhoneNumber({ countryCode: "PH" }), 10),
      organization: randCompanyName(),
      createdAt: randRecentDate().toISOString(),
      assignedUser: randFullName(),
    },
  });
  const bob = await prisma.clients.upsert({
    where: { id: randNumber({ min: 1, max: 1000 }) },
    update: {},
    create: {
      name: randFullName({ gender: "male" }),
      status: "Inactive",
      contact: parseInt(randPhoneNumber({ countryCode: "PH" }), 10),
      organization: randCompanyName(),
      createdAt: randRecentDate().toISOString(),
      assignedUser: randFullName(),
    },
  });
  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
