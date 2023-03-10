import { PrismaClient } from "@prisma/client";
import { randCompanyName, randFullName, randPhoneNumber } from "@ngneat/falso";
import dayjs from "dayjs";
import { ObjectId } from "bson";
const prisma = new PrismaClient();
async function main() {
  const id = new ObjectId().toString();
  const alice = await prisma.clients.upsert({
    where: { id },
    update: {},
    create: {
      name: randFullName({ gender: "female" }),
      status: "Active",
      contact: randPhoneNumber({ countryCode: "PH" }),
      organization: randCompanyName(),
      createdAt: dayjs().format("MM/DD/YYYY"),
      assignedUser: randFullName(),
    },
  });
  const bob = await prisma.clients.upsert({
    where: { id },
    update: {},
    create: {
      name: randFullName({ gender: "male" }),
      status: "Inactive",
      contact: randPhoneNumber({ countryCode: "PH" }),
      organization: randCompanyName(),
      createdAt: dayjs().format("MM/DD/YYYY"),
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
