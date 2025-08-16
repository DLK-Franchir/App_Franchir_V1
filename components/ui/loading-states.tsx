
'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingState({ 
  message = 'Chargement...', 
  size = 'md',
  className 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'flex flex-col items-center justify-center p-8 text-franchir-secondary',
        className
      )}
    >
      <Loader2 className={cn('animate-spin mb-3 text-franchir-blue', sizeClasses[size])} />
      <p className={cn('font-opensans', textSizeClasses[size])}>
        {message}
      </p>
    </motion.div>
  );
}

export function PageLoadingState() {
  return (
    <div className="min-h-screen bg-franchir-cream">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <LoadingState
          message="Chargement de la page..."
          size="lg"
          className="min-h-[400px]"
        />
      </div>
    </div>
  );
}

export function InlineLoadingState({ message, className }: { message?: string; className?: string }) {
  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <Loader2 className="h-5 w-5 animate-spin mr-2 text-franchir-blue" />
      <span className="text-sm text-franchir-secondary font-opensans">
        {message || 'Chargement...'}
      </span>
    </div>
  );
}

// Composant de transition fluide pour les pages
export function PageTransition({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.3, 
        ease: 'easeInOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Loading overlay pour les formulaires ou interactions
export function LoadingOverlay({ 
  isVisible, 
  message = 'Chargement...',
  className 
}: { 
  isVisible: boolean;
  message?: string;
  className?: string;
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg',
        className
      )}
    >
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-franchir-blue mb-2" />
        <p className="text-sm text-franchir-secondary font-opensans">{message}</p>
      </div>
    </motion.div>
  );
}
