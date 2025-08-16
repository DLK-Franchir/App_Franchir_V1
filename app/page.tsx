
'use client';

import { useSession } from 'next-auth/react';
import { useLocale } from '@/lib/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  FileText, 
  MessageSquare, 
  ChevronRight,
  Clock,
  User,
  Phone,
  File,
  Download,
  Headphones
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { data: session } = useSession();
  const { t } = useLocale();

  // Si l'utilisateur n'est pas connecté, rediriger vers signin
  if (!session) {
    return (
      <div className="min-h-screen bg-franchir-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-[#1863DC] mb-4 font-montserrat">
            Franchir.app
          </h1>
          <p className="text-franchir-secondary mb-6 font-opensans">
            Connectez-vous pour accéder à votre espace personnel
          </p>
          <div className="space-y-3">
            <Link href="/auth/signin" className="block">
              <Button className="w-full bg-[#1863DC] hover:bg-[#1863DC]/90 text-white font-opensans">
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/signup" className="block">
              <Button variant="outline" className="w-full border-franchir-border text-[#1863DC] hover:bg-franchir-cream font-opensans">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Données simulées pour les prochaines étapes
  const nextSteps = [
    {
      id: 1,
      title: 'Consultation pré-opératoire',
      date: '2025-01-25',
      time: '14:30',
      type: 'consultation',
      urgent: false
    },
    {
      id: 2,
      title: 'Prise de sang à jeun',
      date: '2025-01-23',
      time: '08:00',
      type: 'examination',
      urgent: true
    },
    {
      id: 3,
      title: 'Appel équipe Franchir',
      date: '2025-01-22',
      time: '15:00',
      type: 'call',
      urgent: false
    }
  ];

  // Messages récents simulés
  const recentMessages = [
    {
      id: 1,
      from: 'Dr. Martin',
      initials: 'DM',
      subject: 'Résultats de votre IRM',
      preview: 'Bonjour, les résultats de votre IRM sont disponibles...',
      time: '2h',
      unread: true
    },
    {
      id: 2,
      from: 'Équipe Franchir',
      initials: 'ÉF',
      subject: 'Rappel rendez-vous',
      preview: 'N\'oubliez pas votre rendez-vous de demain à 14h30...',
      time: '5h',
      unread: true
    },
    {
      id: 3,
      from: 'Secrétariat médical',
      initials: 'SM',
      subject: 'Documents manquants',
      preview: 'Merci de nous transmettre votre carte vitale...',
      time: '1j',
      unread: false
    }
  ];

  // Documents récents simulés
  const recentDocuments = [
    {
      id: 1,
      name: 'IRM genou droit - 20/01/2025',
      type: 'imaging',
      date: '2025-01-20',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Ordonnance post-opératoire',
      type: 'prescription',
      date: '2025-01-18',
      size: '156 KB'
    },
    {
      id: 3,
      name: 'Fiche de consentement',
      type: 'form',
      date: '2025-01-15',
      size: '98 KB'
    }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-franchir-cream">
        {/* Conteneur Principal - Correction du problème d'espacement */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-[#1863DC] mb-2 font-montserrat">
              Bienvenue {session.user?.firstName}
            </h1>
            <p className="text-franchir-secondary font-opensans">
              {session.user?.role === 'PATIENT' 
                ? 'Gérez votre parcours de soins en toute simplicité'
                : 'Suivez vos patients et gérez leur accompagnement'
              }
            </p>
          </motion.div>

          {/* Grille Asymétrique - Structure principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne Gauche (2/3) - Prochaines étapes */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-franchir-white border-franchir-border">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-[#1863DC] font-montserrat">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-6 w-6" />
                      <span className="text-xl font-semibold">Prochaines étapes</span>
                    </div>
                    <Badge className="bg-[#1863DC] text-white text-sm px-3 py-1">
                      {nextSteps.length}
                    </Badge>
                  </CardTitle>
                  <p className="text-franchir-secondary font-opensans mt-2">
                    Suivez vos rendez-vous et examens à venir
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nextSteps.length > 0 ? (
                    nextSteps.map((step) => (
                      <div
                        key={step.id}
                        className="group flex items-center gap-4 p-4 rounded-lg border border-franchir-border hover:bg-franchir-cream hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        {/* Puce de couleur - rouge pour urgent, bleu pour normal */}
                        <div className={`w-4 h-4 rounded-full ${
                          step.urgent ? 'bg-red-500' : 'bg-blue-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-franchir-primary truncate font-opensans text-lg">
                            {step.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-franchir-secondary font-medium">
                              {step.date} à {step.time}
                            </p>
                            {step.urgent && (
                              <Badge className="bg-red-500 text-white text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-franchir-secondary group-hover:text-[#1863DC] transition-colors" />
                      </div>
                    ))
                  ) : (
                    <p className="text-franchir-secondary text-center py-8 font-opensans">
                      Aucune étape prévue
                    </p>
                  )}
                  {/* Bouton CTA avec icône Calendar et fond bleu plein */}
                  <Link href="/calendar">
                    <Button className="w-full mt-6 bg-[#1863DC] hover:bg-[#1863DC]/90 text-white font-opensans font-semibold py-3 text-base">
                      <Calendar className="h-5 w-5 mr-2" />
                      Voir le planning complet
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Colonne Droite (1/3) - Messages et Documents empilés verticalement */}
            <div className="space-y-6">
              {/* Messages récents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-franchir-white border-franchir-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-[#1863DC] font-montserrat">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Messages récents
                      </div>
                      <Badge className="bg-red-500 text-white animate-pulse">
                        {recentMessages.filter(m => m.unread).length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentMessages.length > 0 ? (
                      recentMessages.slice(0, 3).map((message) => (
                        <div
                          key={message.id}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-franchir-cream transition-colors cursor-pointer"
                        >
                          {/* Avatars circulaires avec initiales */}
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-[#1863DC] text-white font-medium">
                                {message.initials}
                              </AvatarFallback>
                            </Avatar>
                            {/* Indicateur "non lu" - puce rouge */}
                            {message.unread && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-franchir-primary truncate font-opensans text-sm">
                              {message.from}
                            </p>
                            <p className="text-xs text-franchir-secondary truncate mb-1">
                              {message.preview}
                            </p>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-franchir-secondary" />
                              <span className="text-xs text-franchir-secondary">Il y a {message.time}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-franchir-secondary text-center py-4 font-opensans">
                        Aucun message
                      </p>
                    )}
                    {/* Boutons d'action - Messages (rouge) et Appel (vert) */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-franchir-border">
                      <Link href="/messages" className="flex-1">
                        <Button className="w-full bg-[#ee585b] hover:bg-[#ee585b]/90 text-white font-opensans text-sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Messages
                        </Button>
                      </Link>
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-opensans px-4">
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
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-franchir-white border-franchir-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-[#1863DC] font-montserrat">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents récents
                      </div>
                      <Badge className="bg-[#1863DC] text-white">
                        {recentDocuments.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {recentDocuments.length > 0 ? (
                      recentDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 py-2 px-1 hover:bg-franchir-cream transition-colors cursor-pointer rounded"
                        >
                          <File className="h-4 w-4 text-[#1863DC] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-franchir-primary truncate font-opensans text-sm">
                              {doc.name}
                            </p>
                            <p className="text-xs text-franchir-secondary">
                              {doc.date} • {doc.size}
                            </p>
                          </div>
                          {/* Icône Download cliquable */}
                          <Download className="h-3 w-3 text-franchir-secondary hover:text-[#1863DC] transition-colors" />
                        </div>
                      ))
                    ) : (
                      <p className="text-franchir-secondary text-center py-4 font-opensans">
                        Aucun document
                      </p>
                    )}
                    {/* Bouton CTA - variant outline */}
                    <Link href="/documents" className="block pt-3 border-t border-franchir-border">
                      <Button variant="outline" className="w-full border-franchir-border text-[#1863DC] hover:bg-franchir-cream font-opensans text-sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Tous les documents
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Bannière "Conciergerie" - Pleine largeur sous la grille principale */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-[#1863DC] border-none text-white shadow-lg relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold font-montserrat mb-2">
                      Conciergerie Franchir 24/7
                    </h2>
                    <p className="text-blue-100 font-opensans text-lg mb-4">
                      Notre équipe dédiée vous accompagne à chaque étape de votre parcours médical. 
                      Disponible jour et nuit, nous sommes là pour répondre à toutes vos questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/messages">
                        <Button className="bg-[#ee585b] hover:bg-[#ee585b]/90 text-white font-opensans font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all">
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Envoyer un message
                        </Button>
                      </Link>
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-opensans font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all">
                        <Phone className="h-5 w-5 mr-2" />
                        Appel d'urgence
                      </Button>
                    </div>
                    <p className="text-white/70 text-sm mt-4 font-opensans">
                      Temps de réponse moyen : moins de 30 minutes
                    </p>
                  </div>
                  
                  {/* Bouton FAB flottant avec icône casque qui se superpose */}
                  <div className="relative ml-8">
                    <Link href="/chatbot">
                      <Button 
                        size="icon"
                        className="h-16 w-16 rounded-full bg-white text-[#1863DC] hover:bg-blue-50 shadow-lg transform hover:scale-105 transition-all duration-200"
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
    </TooltipProvider>
  );
}
