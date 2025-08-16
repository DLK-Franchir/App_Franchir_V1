
import { UserRole, Language } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      role: UserRole;
      language: Language;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    language: Language;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    firstName?: string;
    lastName?: string;
    language: Language;
  }
}
