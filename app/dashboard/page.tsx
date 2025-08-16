'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  Download,
  Clock,
  Phone,
  Headphones,
  User,
  Circle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useNotificationContext } from '@/contexts/notification-context';

// Hook personnalisé pour gérer les données du dashboard
function useDashboardData() {
  const { data: session, status } = useSession();
  const [upcomingSteps, setUpcomingSteps] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      // L'APPEL NE SE FAIT QUE SI LA SESSION EST VALIDE
      if (status === 'authenticated' && session) {
        setIsDataLoading(true);
        
        // Dans un vrai environnement, on ferait des appels API sécurisés ici
        // const [stepsResponse, messagesResponse, documentsResponse] = await Promise.all([
        //   fetch('/api/dashboard/steps'),
        //   fetch('/api/dashboard/messages'),
        //   fetch('/api/dashboard/documents')
        // ]);
        
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Données simulées pour les prochaines étapes
        const stepsData = [
          {
            id: 1,
            title: 'Consultation pré-opératoire',
            description: 'Dr. Martin - Clinique Saint-Germain',
            date: '15 Jan 2025',
            time: '14:30',
            type: 'consultation',
            urgent: false
          },
          {
            id: 2,
            title: 'Prise de sang',
            description: 'Laboratoire Central Paris',
            date: '12 Jan 2025',
            time: '09:00',
            type: 'exam',
            urgent: true
          },
          {
            id: 3,
            title: 'IRM abdominale',
            description: 'Centre d\'imagerie Monceau',
            date: '18 Jan 2025',
            time: '16:00',
            type: 'exam',
            urgent: false
          },
          {
            id: 4,
            title: 'Consultation chirurgien',
            description: 'Dr. Dubois - Hôpital Américain',
            date: '22 Jan 2025',
            time: '10:15',
            type: 'consultation',
            urgent: false
          }
        ];

        // Messages récents simulés
        const messagesData = [
          {
            id: 1,
            sender: 'Dr. Martin',
            initials: 'DM',
            message: 'Vos résultats sont arrivés, nous pouvons programmer...',
            time: '10:30',
            unread: true
          },
          {
            id: 2,
            sender: 'Équipe Franchir',
            initials: 'EF',
            message: 'Votre dossier de remboursement a été traité...',
            time: '14:25',
            unread: true
          },
          {
            id: 3,
            sender: 'Secrétariat',
            initials: 'SC',
            message: 'Rappel : rendez-vous demain à 14h30',
            time: 'Hier',
            unread: false
          }
        ];

        // Documents récents simulés
        const documentsData = [
          {
            id: 1,
            name: 'Ordonnance_Dr_Martin_Jan2025.pdf',
            date: '10 Jan 2025',
            size: '245 KB',
            type: 'prescription'
          },
          {
            id: 2,
            name: 'Rapport_IRM_Decembre.pdf',
            date: '28 Déc 2024',
            size: '1.2 MB',
            type: 'report'
          },
          {
            id: 3,
            name: 'Devis_Intervention_2025.pdf',
            date: '15 Déc 2024',
            size: '180 KB',
            type: 'invoice'
          },
          {
            id: 4,
            name: 'Analyses_Sanguines.pdf',
            date: '10 Déc 2024',
            size: '95 KB',
            type: 'results'
          }
        ];

        setUpcomingSteps(stepsData);
        setRecentMessages(messagesData);
        setRecentDocuments(documentsData);
        setIsDataLoading(false);
      } else if (status === 'unauthenticated') {
        // Si l'utilisateur n'est pas authentifié, on ne charge pas de données
        setUpcomingSteps([]);
        setRecentMessages([]);
        setRecentDocuments([]);
        setIsDataLoading(false);
      }
      // Si le statut est 'loading', on garde isDataLoading à true
    };

    loadDashboardData();
  }, [status, session]); // Déclenche l'effet quand le statut de la session change

  return {
    upcomingSteps,
    recentMessages,
    recentDocuments,
    isDataLoading
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { notifications } = useNotificationContext();

  // Hook pour les données du dashboard - appelé inconditionnellement
  const {
    upcomingSteps,
    recentMessages,
    recentDocuments,
    isDataLoading
  } = useDashboardData();

  // Gère le cas où l'utilisateur n'est pas connecté
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Affiche un état de chargement pendant que la session est vérifiée
  if (status === 'loading') {
    return <PageLoadingState />;
  }

  // Retourne null ou un loader pendant la redirection
  if (status === 'unauthenticated') {
    return null;
  }

  // N'affiche le contenu que si l'utilisateur est authentifié
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-franchir-cream">
      {/* Conteneur principal avec correction du vide */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header de bienvenue */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-franchir-blue font-montserrat mb-2">
            Bonjour {session?.user?.firstName} 👋
          </h1>
          <p className="text-franchir-text-secondary font-opensans">
            Voici un aperçu de votre parcours de soins
          </p>
        </motion.div>

        {/* Grille asymétrique principale */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Colonne de gauche (2/3) - Prochaines étapes */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-franchir-white border-franchir-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-franchir-blue font-montserrat text-xl">
                    Prochaines étapes
                  </CardTitle>
                  <p className="text-franchir-text-secondary text-sm font-opensans">
                    Suivez vos rendez-vous et examens à venir
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-franchir-cream/50 transition-colors cursor-pointer border border-transparent hover:border-franchir-border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      {/* Puce de couleur */}
                      <div className={`w-3 h-3 rounded-full ${step.urgent ? 'bg-franchir-red' : 'bg-franchir-blue'}`} />
                      
                      {/* Contenu */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-franchir-text-primary font-opensans">
                            {step.title}
                          </h3>
                          {step.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-franchir-text-secondary mb-1">
                          {step.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-franchir-text-secondary">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {step.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {step.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Bouton CTA */}
                  <div className="pt-4">
                    <Link href="/calendar">
                      <Button className="bg-franchir-blue hover:bg-franchir-blue/90 text-white font-opensans">
                        <Calendar className="mr-2 h-4 w-4" />
                        Voir le planning complet
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Colonne de droite (1/3) - Messages et Documents */}
          <div className="space-y-6">
            
            {/* Messages récents */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-franchir-white border-franchir-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-franchir-blue font-montserrat text-lg">
                    Messages récents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-franchir-cream/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {/* Avatar avec indicateur non lu */}
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-franchir-blue text-white font-medium text-sm">
                            {message.initials}
                          </AvatarFallback>
                        </Avatar>
                        {message.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-franchir-red rounded-full" />
                        )}
                      </div>
                      
                      {/* Contenu du message */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-franchir-text-primary text-sm font-opensans">
                          {message.sender}
                        </p>
                        <p className="text-sm text-franchir-text-secondary truncate">
                          {message.message}
                        </p>
                        <p className="text-xs text-franchir-text-secondary mt-1">
                          {message.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Boutons d'action */}
                  <div className="flex gap-2 pt-2">
                    <Link href="/messages" className="flex-1">
                      <Button className="w-full bg-franchir-red hover:bg-franchir-red/90 text-white font-opensans">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages
                      </Button>
                    </Link>
                    <Button 
                      size="icon" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      title="Appeler"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Documents récents */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-franchir-white border-franchir-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-franchir-blue font-montserrat text-lg">
                    Documents récents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-franchir-cream/50 transition-colors group cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {/* Icône de fichier */}
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-franchir-blue" />
                      </div>
                      
                      {/* Informations du document */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-franchir-text-primary text-sm font-opensans truncate">
                          {doc.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-franchir-text-secondary">
                          <span>{doc.date}</span>
                          <Circle className="h-1 w-1 fill-current" />
                          <span>{doc.size}</span>
                        </div>
                      </div>
                      
                      {/* Icône téléchargement */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      >
                        <Download className="h-4 w-4 text-franchir-blue" />
                      </Button>
                    </motion.div>
                  ))}
                  
                  {/* Bouton CTA */}
                  <div className="pt-2">
                    <Link href="/documents">
                      <Button 
                        variant="outline" 
                        className="w-full border-franchir-border text-franchir-blue hover:bg-franchir-cream font-opensans"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Tous les documents
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Bannière Conciergerie pleine largeur */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-franchir-blue text-white border-0 shadow-xl relative overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-montserrat mb-2">
                    Conciergerie Médicale 24/7
                  </h2>
                  <p className="text-blue-100 font-opensans text-lg mb-4">
                    Notre équipe est à votre disposition pour toutes vos questions et démarches administratives
                  </p>
                  <div className="flex items-center gap-4 text-blue-100 text-sm">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Disponible 24h/24
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      +33 1 23 45 67 89
                    </span>
                  </div>
                </div>
                
                {/* Bouton FAB flottant */}
                <div className="relative">
                  <Link href="/chatbot">
                    <Button 
                      size="icon"
                      className="h-16 w-16 rounded-full bg-white text-franchir-blue hover:bg-blue-50 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Headphones className="h-8 w-8" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
