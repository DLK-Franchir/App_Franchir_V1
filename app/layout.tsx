
import type { Metadata, Viewport } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { Providers } from '@/components/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Franchir.app - Votre Parcours de Soins Personnalisé',
  description: 'Application médicale sécurisée pour la gestion de vos soins et la communication avec votre équipe médicale',
  keywords: ['santé', 'médical', 'soins', 'chirurgie', 'patients', 'dossier médical'],
  authors: [{ name: 'Franchir.app' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased bg-franchir-cream">
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
