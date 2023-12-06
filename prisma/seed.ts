const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  await prisma.school.deleteMany();
  for (let i = 0; i < 20; i++) {
    const street = faker.location.streetAddress();
    const city = faker.location.city();
    const country = faker.location.country();
    const postal = faker.location.zipCode();
    await prisma.school.create({
      data: {
        street,
        city,
        country,
        postal,
        address: `${street}, ${postal} ${city}`,
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
