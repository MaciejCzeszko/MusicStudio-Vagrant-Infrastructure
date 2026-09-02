import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.studio.deleteMany();
  const hashedUserPassword = await bcrypt.hash("test", 10);
  const hashedAdminPassword = await bcrypt.hash("admin", 10);
  const user1 = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      password: hashedUserPassword,
      role: "user",
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "testadmin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password: hashedAdminPassword,
      role: "admin",
    },
  });

  const gearList = [
    "2 active columns QSC KW 122",
    "Vocal microphone sennheiser 845s",
    "Marshall JCM800 + 4x12 Marshall",
    "Hartke Kilo",
    "Hartke x 2",
    "Gretsch Renown",
    "Double bass pedal Gibraltar",
  ];
  const studios = [
    {
      name: "Sala A",
      price: 100,
      imageUrl: "SalaA.jpg",
    },
    { name: "Sala B", price: 100, imageUrl: "SalaB.jpg" },
    { name: "Sala C", price: 150, imageUrl: "SalaC.jpg" },
    { name: "Studio A", price: 200, imageUrl: "StudioA.jpg" },
    { name: "Studio B", price: 250, imageUrl: "StudioB.jpg" },
  ];
  for (const studio of studios) {
    await prisma.studio.upsert({
      where: { name: studio.name },
      update: {},
      create: {
        ...studio,
        gear: gearList,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
