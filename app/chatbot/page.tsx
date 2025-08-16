
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Send, 
  Phone, 
  User, 
  Loader2,
  MessageSquare,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatbotPage() {
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

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: `Bonjour ${session.user?.firstName || 'cher patient'} ! 👋 Je suis votre assistant virtuel Franchir. Comment puis-je vous aider aujourd'hui ?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-franchir-cream">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-franchir-white border border-franchir-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-franchir-blue to-franchir-blue/80 rounded-lg flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-playfair text-franchir-secondary">
                    Conciergerie Franchir
                  </h1>
                  <p className="text-franchir-muted font-opensans text-sm">
                    Votre assistant personnel disponible 24/7
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-franchir-border"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button 
                  size="sm"
                  className="bg-franchir-blue hover:bg-franchir-blue/90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="bg-franchir-white border-franchir-border">
            <CardHeader className="border-b border-franchir-border">
              <CardTitle className="text-franchir-secondary font-playfair">
                Assistant Virtuel
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[80%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.isBot 
                            ? 'bg-franchir-blue text-white' 
                            : 'bg-franchir-secondary text-white'
                        }`}>
                          {msg.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          msg.isBot 
                            ? 'bg-franchir-blue/10 text-franchir-secondary' 
                            : 'bg-franchir-blue text-white'
                        }`}>
                          <p className="text-sm font-opensans">{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.isBot ? 'text-franchir-muted' : 'text-blue-100'
                          }`}>
                            {msg.timestamp.toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-franchir-blue flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-franchir-blue/10 rounded-2xl px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-franchir-blue" />
                          <p className="text-sm text-franchir-muted font-opensans">
                            Réflexion en cours...
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-franchir-border">
                <div className="flex gap-3">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1 border-franchir-border"
                    disabled={isLoading}
                  />
                  <Button 
                    className="bg-franchir-blue hover:bg-franchir-blue/90"
                    disabled={!message.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
