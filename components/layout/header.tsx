
'use client';

import { useSession, signOut } from 'next-auth/react';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNotificationContext } from '@/contexts/notification-context';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const { notifications, dismissNotification, getTotalVisibleCount } = useNotificationContext();

  const handleNotificationClick = () => {
    // Marquer les notifications du header comme lues
    dismissNotification('header');
  };

  const totalNotificationCount = getTotalVisibleCount();

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-franchir-border bg-franchir-white/95 backdrop-blur supports-[backdrop-filter]:bg-franchir-white/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container flex h-16 items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {onMenuClick && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMenuClick} 
              className="md:hidden hover:bg-franchir-cream text-franchir-blue"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          
          {session ? (
            <>
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-franchir-cream text-franchir-blue transition-colors duration-200"
                onClick={handleNotificationClick}
                title="Cliquez pour marquer comme lu"
              >
                <Bell className="h-5 w-5" />
                <AnimatePresence>
                  {notifications.header.isVisible && notifications.header.count > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge 
                        className="h-5 w-5 p-0 text-xs rounded-full bg-franchir-red hover:bg-franchir-red text-white cursor-pointer animate-pulse"
                      >
                        {notifications.header.count}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-franchir-cream text-franchir-blue">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {session.user?.firstName || session.user?.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-franchir-white border-franchir-border">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-franchir-primary">
                      {session.user?.firstName} {session.user?.lastName}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="text-franchir-primary hover:bg-franchir-cream">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/notifications" className="text-franchir-primary hover:bg-franchir-cream">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-franchir-red hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-franchir-blue hover:bg-franchir-cream">
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-franchir-blue hover:bg-franchir-blue/90 text-white">
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
