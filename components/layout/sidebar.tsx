
'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Bot, 
  User, 
  Users,
  Heart,
  Bell,
  X,
  Shield,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useNotificationContext } from '@/contexts/notification-context';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { notifications, dismissNotification } = useNotificationContext();

  const handleNotificationClick = (notificationType: 'messages' | 'notifications' | 'documents') => {
    dismissNotification(notificationType);
  };

  const patientNavItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      badge: null,
      notificationType: null
    },
    {
      href: '/medical',
      icon: Heart,
      label: 'Dossier médical',
      badge: null,
      notificationType: null
    },
    {
      href: '/calendar',
      icon: Calendar,
      label: 'Calendrier',
      badge: null,
      notificationType: null
    },
    {
      href: '/documents',
      icon: FileText,
      label: 'Mes documents',
      badge: notifications.documents.isVisible ? notifications.documents.count : null,
      notificationType: 'documents' as const
    },
    {
      href: '/messages',
      icon: MessageSquare,
      label: 'Mes messages',
      badge: notifications.messages.isVisible ? notifications.messages.count : null,
      notificationType: 'messages' as const
    },
    {
      href: '/chatbot',
      icon: Bot,
      label: 'Conciergerie',
      badge: null,
      notificationType: null
    }
  ];

  const surgeonNavItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      badge: null,
      notificationType: null
    },
    {
      href: '/patients',
      icon: Users,
      label: 'Mes patients',
      badge: null,
      notificationType: null
    },
    {
      href: '/documents',
      icon: FileText,
      label: 'Documents',
      badge: notifications.documents.isVisible ? notifications.documents.count : null,
      notificationType: 'documents' as const
    },
    {
      href: '/messages',
      icon: MessageSquare,
      label: 'Messages',
      badge: notifications.messages.isVisible ? notifications.messages.count : null,
      notificationType: 'messages' as const
    }
  ];

  const staffNavItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      badge: null,
      notificationType: null
    },
    {
      href: '/admin',
      icon: Shield,
      label: 'Administration',
      badge: null,
      notificationType: null
    },
    {
      href: '/patients',
      icon: Users,
      label: 'Patients',
      badge: null,
      notificationType: null
    },
    {
      href: '/documents',
      icon: FileText,
      label: 'Documents',
      badge: notifications.documents.isVisible ? notifications.documents.count : null,
      notificationType: 'documents' as const
    },
    {
      href: '/messages',
      icon: MessageSquare,
      label: 'Messages',
      badge: notifications.messages.isVisible ? notifications.messages.count : null,
      notificationType: 'messages' as const
    },
    {
      href: '/notifications',
      icon: Bell,
      label: 'Notifications',
      badge: notifications.notifications.isVisible ? notifications.notifications.count : null,
      notificationType: 'notifications' as const
    }
  ];

  const getNavItems = () => {
    switch (session?.user?.role) {
      case 'SURGEON':
        return surgeonNavItems;
      case 'STAFF':
        return staffNavItems;
      default:
        return patientNavItems;
    }
  };

  if (!session) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside 
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r border-franchir-border bg-franchir-white transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
        initial={false}
        animate={{ x: isOpen ? 0 : -264 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ 
          transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'translateX(0)' : undefined 
        }}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 md:hidden border-b border-franchir-border">
            <span className="text-lg font-semibold text-franchir-blue font-montserrat">Tableau de bord</span>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-franchir-blue hover:bg-franchir-cream">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {getNavItems().map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      // Marquer la notification comme lue si elle existe
                      if (item.notificationType && item.badge) {
                        handleNotificationClick(item.notificationType);
                      }
                      onClose?.();
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium font-opensans transition-all duration-200 hover:scale-[1.02]",
                      isActive 
                        ? "bg-franchir-blue text-white shadow-md" 
                        : "text-franchir-primary hover:bg-franchir-cream hover:text-franchir-blue"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </div>
                    <AnimatePresence>
                      {item.badge && item.badge > 0 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge 
                            className="ml-auto bg-franchir-red text-white cursor-pointer hover:bg-franchir-red/90 transition-colors animate-pulse"
                            title="Cliquez pour marquer comme lu"
                          >
                            {item.badge}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-franchir-border p-4">
            <Link href="/profile" onClick={onClose}>
              <div className="flex items-center rounded-lg p-2 hover:bg-franchir-cream transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-franchir-blue text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-franchir-primary truncate font-opensans">
                    {session.user?.firstName} {session.user?.lastName}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
