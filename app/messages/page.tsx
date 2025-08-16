'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Send, 
  Search,
  Phone,
  Video,
  User,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  // Conversations simulées pour la démonstration
  const conversations = [
    {
      id: '1',
      title: 'Support Franchir',
      lastMessage: 'Votre dossier a été mis à jour',
      time: '10:30',
      unread: 2,
      type: 'support'
    },
    {
      id: '2', 
      title: 'Équipe Médicale',
      lastMessage: 'Rappel de votre rendez-vous demain',
      time: '14:15',
      unread: 0,
      type: 'medical'
    }
  ];

  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  return (
    <div className="min-h-screen bg-franchir-cream">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-franchir-white border border-franchir-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-franchir-blue/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-franchir-blue" />
                </div>
                <div>
                  <h1 className="text-2xl font-playfair text-franchir-secondary">
                    Messages
                  </h1>
                  <p className="text-franchir-muted font-opensans text-sm">
                    Communication avec l'équipe Franchir
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-franchir-border">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
                <Button size="sm" className="bg-franchir-blue hover:bg-franchir-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="bg-franchir-white border-franchir-border">
                <CardHeader>
                  <CardTitle className="text-franchir-secondary font-playfair">
                    Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2 p-4">
                    {conversations.map((conv) => (
                      <div 
                        key={conv.id}
                        className="p-3 rounded-lg border border-franchir-border hover:bg-franchir-cream/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-franchir-blue/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-franchir-blue" />
                            </div>
                            <div>
                              <h4 className="font-playfair text-franchir-secondary text-sm font-semibold">
                                {conv.title}
                              </h4>
                              <p className="text-xs text-franchir-muted truncate">
                                {conv.lastMessage}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-franchir-muted">{conv.time}</p>
                            {conv.unread > 0 && (
                              <Badge className="bg-franchir-blue text-white text-xs mt-1">
                                {conv.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="bg-franchir-white border-franchir-border">
                {selectedConversation ? (
                  <>
                    <CardHeader className="border-b border-franchir-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-franchir-blue/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-franchir-blue" />
                          </div>
                          <div>
                            <h3 className="font-playfair text-franchir-secondary font-semibold">
                              {selectedConversation.title}
                            </h3>
                            <p className="text-xs text-franchir-muted">En ligne</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-96 p-6 overflow-y-auto">
                        <div className="space-y-4">
                          <div className="flex justify-start">
                            <div className="bg-franchir-blue/10 rounded-2xl px-4 py-2 max-w-xs">
                              <p className="text-sm text-franchir-secondary">
                                Bonjour ! Comment puis-je vous aider aujourd'hui ?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t border-franchir-border">
                        <div className="flex gap-3">
                          <Input
                            placeholder="Tapez votre message..."
                            className="flex-1 border-franchir-border"
                          />
                          <Button className="bg-franchir-blue hover:bg-franchir-blue/90">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-franchir-muted mx-auto mb-4" />
                    <h3 className="text-lg font-playfair text-franchir-secondary mb-2">
                      Sélectionnez une conversation
                    </h3>
                    <p className="text-franchir-muted font-opensans">
                      Choisissez une conversation pour commencer à échanger
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}