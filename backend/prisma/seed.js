const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password', 
      // Add any other fields if required by your schema
    },
  });
}

main()
  .then(() => console.log('Seeding complete'))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
