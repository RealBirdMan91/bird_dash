const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  await prisma.school.deleteMany();
  for (let i = 0; i < 20; i++) {
    await prisma.school.create({
      data: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        postal: faker.location.zipCode(),
        testNumber: i,
        information: faker.lorem.sentence({
          min: 50,
          max: 100,
        }),
        phone: faker.phone.number(),
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
