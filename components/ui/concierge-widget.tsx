
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Headphones, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';

export function ConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { data: session } = useSession();

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement send message to concierge
      console.log('Sending message to concierge:', message);
      setMessage('');
      // Simulate response or redirect to messages page
      window.location.href = '/messages';
    }
  };

  const quickActions = [
    {
      title: 'Urgence Médicale',
      description: 'Ligne d\'urgence 24/7',
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => window.open('tel:+33123456789', '_self')
    },
    {
      title: 'Questions Générales',
      description: 'Support et informations',
      icon: MessageCircle,
      color: 'bg-franchir-blue hover:bg-franchir-blue/90',
      action: () => window.location.href = '/messages'
    },
    {
      title: 'Prise de RDV',
      description: 'Planifier un rendez-vous',
      icon: Clock,
      color: 'bg-franchir-red hover:bg-franchir-red/90',
      action: () => window.location.href = '/calendar'
    }
  ];

  if (!session) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-franchir-blue hover:bg-franchir-blue/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Headphones className="h-6 w-6" />
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-franchir-blue animate-ping opacity-20"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-franchir-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Conciergerie 24/7
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Widget Panel */}
            <motion.div
              className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="bg-franchir-white border-franchir-border shadow-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-franchir-blue rounded-lg">
                      <Headphones className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-franchir-blue font-montserrat">
                        Conciergerie Franchir
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-franchir-secondary">En ligne 24/7</span>
                        <Badge className="bg-franchir-red text-white text-xs">Premium</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Welcome Message */}
                  <div className="bg-franchir-cream rounded-lg p-3">
                    <p className="text-sm text-franchir-primary font-opensans">
                      👋 Bonjour {session?.user?.firstName} ! Comment puis-je vous aider aujourd'hui ?
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-franchir-primary font-opensans">Actions rapides :</h4>
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={action.action}
                        className={`w-full text-left p-3 rounded-lg text-white ${action.color} transition-all duration-200 group`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <action.icon className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{action.title}</p>
                            <p className="text-xs opacity-90 truncate">{action.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Quick Message */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-franchir-primary font-opensans">Message rapide :</h4>
                    <div className="flex gap-2">
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        className="flex-1 resize-none border-franchir-border focus:ring-franchir-blue focus:border-franchir-blue text-sm"
                        rows={2}
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-franchir-blue hover:bg-franchir-blue/90 text-white self-end"
                        size="sm"
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-2 border-t border-franchir-border">
                    <p className="text-xs text-franchir-secondary">
                      Service premium disponible 24h/24 et 7j/7
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
