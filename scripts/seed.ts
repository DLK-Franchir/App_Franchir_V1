import { PrismaClient, UserRole, Language, DocumentType, NotificationType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ... (le reste de votre script de seed est bon, assurez-vous juste que cette ligne d'import est la seule en haut)
  console.log('🌱 Début du seeding...');

  await prisma.notification.deleteMany();
  // ... etc.
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
