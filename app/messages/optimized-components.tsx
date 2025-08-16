
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { ContactSkeleton, MessageSkeleton } from '@/components/ui/loading-skeleton';
import { InlineLoadingState, LoadingOverlay } from '@/components/ui/loading-states';
import { useNotificationContext } from '@/contexts/notification-context';
import { useScrollAnimation } from '@/hooks/use-intersection-observer';
import { useSession } from 'next-auth/react';

// Composant contact optimisé avec lazy loading
export function OptimizedContactItem({ 
  contact, 
  isSelected, 
  onClick, 
  index 
}: { 
  contact: any; 
  isSelected: boolean; 
  onClick: () => void; 
  index: number;
}) {
  const { dismissNotification } = useNotificationContext();
  const { ref, animate, initial, transition } = useScrollAnimation(index * 0.05);

  const handleClick = () => {
    // Marquer les messages comme lus lorsqu'on sélectionne un contact
    if (contact.unread > 0) {
      dismissNotification('messages');
    }
    onClick();
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate ? { opacity: 1, y: 0 } : initial}
      transition={{ ...transition, delay: index * 0.05 }}
      onClick={handleClick}
      className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'bg-franchir-blue text-white shadow-md' 
          : 'hover:bg-franchir-cream/70 border border-transparent hover:border-franchir-blue/10'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <motion.div 
            className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-colors ${
              isSelected 
                ? 'bg-white text-franchir-blue' 
                : 'bg-gradient-to-br from-franchir-blue to-franchir-blue/80 text-white group-hover:shadow-lg'
            }`}
            whileHover={{ rotate: 5 }}
          >
            {contact.avatar}
          </motion.div>
          {contact.online && (
            <motion.div 
              className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold truncate font-opensans text-sm ${
              isSelected ? 'text-white' : 'text-franchir-primary'
            }`}>
              {contact.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${
                isSelected ? 'text-white/70' : 'text-franchir-secondary'
              }`}>
                {contact.time}
              </span>
              <AnimatePresence>
                {contact.unread > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-franchir-red text-white text-xs px-2 py-1">
                      {contact.unread}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className={`text-xs truncate mb-1 ${
            isSelected ? 'text-white/80' : 'text-franchir-blue'
          }`}>
            {contact.role}
          </p>
          <p className={`text-xs truncate ${
            isSelected ? 'text-white/70' : 'text-franchir-secondary'
          }`}>
            {contact.lastMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Composant message optimisé avec animations
export function OptimizedMessageBubble({ 
  message, 
  index, 
  contactAvatar 
}: { 
  message: any; 
  index: number; 
  contactAvatar?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} group`}
    >
      <motion.div 
        className={`max-w-xs sm:max-w-md lg:max-w-lg flex items-end gap-2 ${
          message.isOwn ? 'flex-row-reverse' : 'flex-row'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        {!message.isOwn && contactAvatar && (
          <motion.div 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-franchir-blue text-white text-xs font-medium shadow-md"
            whileHover={{ rotate: 10 }}
          >
            {contactAvatar}
          </motion.div>
        )}
        <motion.div 
          className={`px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm transition-all duration-200 group-hover:shadow-lg ${
            message.isOwn 
              ? 'bg-gradient-to-br from-franchir-blue to-franchir-blue/90 text-white rounded-br-md' 
              : 'bg-white border border-franchir-border text-franchir-primary rounded-bl-md'
          }`}
          whileHover={{ y: -2 }}
        >
          <p className="text-sm font-opensans leading-relaxed">{message.content}</p>
          <div className={`flex items-center justify-between mt-2 text-xs gap-2 ${
            message.isOwn ? 'text-white/80' : 'text-franchir-secondary'
          }`}>
            <span className="font-medium">{message.time}</span>
            {message.isOwn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={`h-4 w-4 transition-colors duration-200 ${
                  message.read ? 'text-blue-200' : 'text-white/60'
                }`}>
                  ✓✓
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Hook personnalisé pour la gestion des messages avec performance
export function useOptimizedMessages() {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(1);

  // Simulation de chargement asynchrone des données conditionnées par la session
  useEffect(() => {
    const loadData = async () => {
      // L'APPEL NE SE FAIT QUE SI LA SESSION EST VALIDE
      if (status === 'authenticated' && session) {
        setIsLoading(true);
        
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dans un vrai environnement, on ferait un appel API sécurisé ici
        // const response = await fetch('/api/messages', {
        //   headers: {
        //     'Authorization': `Bearer ${session.accessToken}`
        //   }
        // });
        // const data = await response.json();
        
        const contactsData = [
          {
            id: 1,
            name: 'Conciergerie Franchir',
            role: 'Service 24/7',
            lastMessage: 'Votre dossier a été mis à jour avec les derniers résultats...',
            time: '14:30',
            unread: 2,
            online: true,
            avatar: 'CF'
          },
          {
            id: 2,
            name: 'Marie Lecomte',
            role: 'Coordinatrice médicale',
            lastMessage: 'Votre rendez-vous a été confirmé pour demain',
            time: '12:15',
            unread: 0,
            online: true,
            avatar: 'ML'
          },
          {
            id: 3,
            name: 'Support Administratif',
            role: 'Équipe Franchir',
            lastMessage: 'Vos documents sont prêts pour récupération',
            time: 'Hier',
            unread: 1,
            online: true,
            avatar: 'SA'
          },
          {
            id: 4,
            name: 'Urgence Franchir',
            role: 'Ligne d\'urgence 24/7',
            lastMessage: 'Service d\'urgence disponible',
            time: '24h/24',
            unread: 0,
            online: true,
            avatar: 'UF'
          }
        ];

        const messagesData = [
          {
            id: 1,
            senderId: 1,
            senderName: 'Conciergerie Franchir',
            content: 'Bonjour ! Votre dossier médical a été mis à jour avec vos derniers résultats d\'IRM. Notre équipe a coordonné avec votre chirurgien et tout semble parfait pour votre intervention.',
            time: '14:20',
            isOwn: false,
            read: true
          },
          {
            id: 2,
            senderId: 'current-user',
            senderName: 'Vous',
            content: 'Merci beaucoup. Y a-t-il des documents que je dois préparer ou des instructions spéciales ?',
            time: '14:25',
            isOwn: true,
            read: true
          },
          {
            id: 3,
            senderId: 1,
            senderName: 'Conciergerie Franchir',
            content: 'Parfait ! Je vous envoie immédiatement votre fiche pré-opératoire personnalisée. Notre équipe s\'occupe de tout coordonner avec l\'hôpital. Vous recevrez aussi un appel de confirmation demain.',
            time: '14:30',
            isOwn: false,
            read: false
          }
        ];

        setContacts(contactsData);
        setMessages(messagesData);
        setIsLoading(false);
      } else if (status === 'unauthenticated') {
        // Si l'utilisateur n'est pas authentifié, on ne charge pas de données
        setContacts([]);
        setMessages([]);
        setIsLoading(false);
      }
      // Si le statut est 'loading', on garde isLoading à true
    };

    loadData();
  }, [status, session]); // Déclenche l'effet quand le statut de la session change

  return {
    contacts,
    messages,
    isLoading,
    selectedContact,
    setSelectedContact
  };
}
