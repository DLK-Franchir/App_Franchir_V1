
import { PrismaClient } from '@prisma/client';
import { UserRole, Language, DocumentType, NotificationType } from '@/lib/types';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer la base de données
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationUser.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.document.deleteMany();
  await prisma.medicalProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Créer les utilisateurs
  const hashedPassword = await bcrypt.hash('johndoe123', 12);

  // Utilisateur de test mandataire (admin)
  const testAdmin = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.STAFF,
      language: Language.FRENCH,
      phone: '+1 (555) 123-4567'
    }
  });

  // Patients
  const patient1 = await prisma.user.create({
    data: {
      email: 'marie.dubois@email.com',
      password: await bcrypt.hash('patient123', 12),
      firstName: 'Marie',
      lastName: 'Dubois',
      role: UserRole.PATIENT,
      language: Language.FRENCH,
      phone: '+1 (514) 123-4567'
    }
  });

  const patient2 = await prisma.user.create({
    data: {
      email: 'david.smith@email.com',
      password: await bcrypt.hash('patient123', 12),
      firstName: 'David',
      lastName: 'Smith',
      role: UserRole.PATIENT,
      language: Language.ENGLISH,
      phone: '+1 (416) 987-6543'
    }
  });

  // Chirurgien
  const surgeon1 = await prisma.user.create({
    data: {
      email: 'dr.martin@hospital.fr',
      password: await bcrypt.hash('surgeon123', 12),
      firstName: 'Dr. Pierre',
      lastName: 'Martin',
      role: UserRole.SURGEON,
      language: Language.FRENCH,
      phone: '+33 1 42 34 56 78'
    }
  });

  // Staff Franchir
  const staff1 = await prisma.user.create({
    data: {
      email: 'sophie.coordinator@franchir.ca',
      password: await bcrypt.hash('staff123', 12),
      firstName: 'Sophie',
      lastName: 'Coordinator',
      role: UserRole.STAFF,
      language: Language.FRENCH,
      phone: '+1 (514) 456-7890'
    }
  });

  // Médecin demandé par l'utilisateur avec login "medecin@gmail.com" et mot de passe "test"
  const medecin = await prisma.user.create({
    data: {
      email: 'medecin@gmail.com',
      password: await bcrypt.hash('test', 12),
      firstName: 'Dr. Alexandre',
      lastName: 'Médecin',
      role: UserRole.SURGEON,
      language: Language.FRENCH,
      phone: '+33 1 45 67 89 01'
    }
  });

  console.log('✅ Utilisateurs créés');

  // Créer les profils médicaux pour les patients
  await prisma.medicalProfile.create({
    data: {
      userId: patient1.id,
      dateOfBirth: new Date('1975-03-15'),
      gender: 'Femme',
      bloodType: 'O+',
      allergies: 'Pénicilline',
      currentMedications: 'Ibuprofène 400mg - 2x/jour',
      medicalHistory: 'Hernie discale L4-L5, douleurs chroniques depuis 2 ans',
      emergencyContactName: 'Pierre Dubois (époux)',
      emergencyContactPhone: '+1 (514) 123-4568',
      insuranceProvider: 'Assurance Maladie du Québec',
      insuranceNumber: 'DUBM75031512345',
      diagnosisDetails: 'Hernie discale L4-L5 avec compression radiculaire',
      surgeryType: 'Discectomie percutanée',
      surgeryDate: new Date('2024-02-15'),
      surgeonId: surgeon1.id,
      hospitalName: 'Hôpital Saint-Louis, Paris',
      notes: 'Patiente motivée, excellente compliance au traitement'
    }
  });

  await prisma.medicalProfile.create({
    data: {
      userId: patient2.id,
      dateOfBirth: new Date('1968-08-22'),
      gender: 'Homme',
      bloodType: 'A+',
      allergies: 'Aucune allergie connue',
      currentMedications: 'Tramadol 50mg - selon besoin',
      medicalHistory: 'Sténose spinale lombaire, claudication neurologique',
      emergencyContactName: 'Jennifer Smith (épouse)',
      emergencyContactPhone: '+1 (416) 987-6544',
      insuranceProvider: 'OHIP Ontario',
      insuranceNumber: 'SMID68082287654',
      diagnosisDetails: 'Sténose spinale lombaire multi-étagée L3-L4-L5',
      surgeryType: 'Laminectomie décompressive',
      surgeryDate: new Date('2024-03-01'),
      surgeonId: surgeon1.id,
      hospitalName: 'Institut du Rachis, Paris',
      notes: 'Cas complexe, nécessite suivi post-opératoire attentif'
    }
  });

  console.log('✅ Profils médicaux créés');

  // Créer des documents de test
  await prisma.document.create({
    data: {
      title: 'IRM Lombaire - Mars 2023',
      description: 'IRM de contrôle montrant la hernie discale L4-L5',
      fileName: 'irm-lombaire-mars2023.pdf',
      fileSize: 2048576,
      mimeType: 'application/pdf',
      filePath: '/uploads/documents/irm-lombaire-mars2023.pdf',
      type: DocumentType.IMAGING,
      uploadedById: patient1.id,
      patientId: patient1.id
    }
  });

  await prisma.document.create({
    data: {
      title: 'Rapport Consultation Pré-opératoire',
      description: 'Évaluation complète avant intervention chirurgicale',
      fileName: 'consultation-preop-janvier2024.pdf',
      fileSize: 1024768,
      mimeType: 'application/pdf',
      filePath: '/uploads/documents/consultation-preop-janvier2024.pdf',
      type: DocumentType.MEDICAL_REPORT,
      uploadedById: surgeon1.id,
      patientId: patient1.id
    }
  });

  await prisma.document.create({
    data: {
      title: 'Scanner Lombaire - Octobre 2023',
      description: 'Scanner avec injection de contraste',
      fileName: 'scanner-lombaire-oct2023.pdf',
      fileSize: 3145728,
      mimeType: 'application/pdf',
      filePath: '/uploads/documents/scanner-lombaire-oct2023.pdf',
      type: DocumentType.IMAGING,
      uploadedById: patient2.id,
      patientId: patient2.id
    }
  });

  console.log('✅ Documents créés');

  // Créer des conversations
  const conversation1 = await prisma.conversation.create({
    data: {
      title: 'Discussion - Marie Dubois',
      isGroup: false
    }
  });

  const conversation2 = await prisma.conversation.create({
    data: {
      title: 'Support Franchir - David Smith',
      isGroup: false
    }
  });

  // Ajouter les participants aux conversations
  await prisma.conversationUser.createMany({
    data: [
      { conversationId: conversation1.id, userId: patient1.id },
      { conversationId: conversation1.id, userId: surgeon1.id },
      { conversationId: conversation2.id, userId: patient2.id },
      { conversationId: conversation2.id, userId: staff1.id }
    ]
  });

  // Créer des messages
  await prisma.message.createMany({
    data: [
      {
        content: 'Bonjour Dr. Martin, j\'ai quelques questions concernant mon intervention prévue le 15 février.',
        conversationId: conversation1.id,
        senderId: patient1.id,
        recipientId: surgeon1.id,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 jour
      },
      {
        content: 'Bonjour Madame Dubois, je serai ravi de répondre à toutes vos questions. N\'hésitez pas à me faire part de vos préoccupations.',
        conversationId: conversation1.id,
        senderId: surgeon1.id,
        recipientId: patient1.id,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000) // 20 heures
      },
      {
        content: 'Hello, I would like to know more about the post-surgery rehabilitation process.',
        conversationId: conversation2.id,
        senderId: patient2.id,
        recipientId: staff1.id,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 heures
      },
      {
        content: 'Bonjour David! Je vais vous envoyer un guide détaillé sur la rééducation post-opératoire. L\'équipe de kinésithérapeutes sera également à votre disposition.',
        conversationId: conversation2.id,
        senderId: staff1.id,
        recipientId: patient2.id,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 heures
      }
    ]
  });

  console.log('✅ Conversations et messages créés');

  // Créer des notifications
  await prisma.notification.createMany({
    data: [
      {
        title: 'Nouveau document disponible',
        message: 'Votre rapport de consultation pré-opératoire est maintenant disponible',
        type: NotificationType.DOCUMENT_UPLOADED,
        userId: patient1.id,
        link: '/documents',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 heures
      },
      {
        title: 'Rappel de rendez-vous',
        message: 'N\'oubliez pas votre consultation de suivi demain à 14h00',
        type: NotificationType.APPOINTMENT_REMINDER,
        userId: patient1.id,
        link: '/medical',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 heure
      },
      {
        title: 'Nouveau message',
        message: 'Dr. Martin a répondu à votre question',
        type: NotificationType.MESSAGE,
        userId: patient1.id,
        link: '/messages',
        createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes
      },
      {
        title: 'Welcome to Franchir',
        message: 'Welcome David! Your medical coordinator will contact you soon.',
        type: NotificationType.SYSTEM,
        userId: patient2.id,
        link: '/dashboard',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 heures
      }
    ]
  });

  console.log('✅ Notifications créées');

  console.log('🎉 Seeding terminé avec succès!');
  console.log('\n📝 Comptes de test créés:');
  console.log('👨‍💼 Admin: john@doe.com / johndoe123');
  console.log('🏥 Patient (FR): marie.dubois@email.com / patient123');
  console.log('🏥 Patient (EN): david.smith@email.com / patient123');
  console.log('👨‍⚕️ Chirurgien: dr.martin@hospital.fr / surgeon123');
  console.log('👩‍💼 Staff: sophie.coordinator@franchir.ca / staff123');
  console.log('👩‍⚕️ Médecin: medecin@gmail.com / test');
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
