
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/loading-skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  fallback,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError && fallback) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-franchir-cream text-franchir-secondary',
        className
      )}>
        <span className="text-sm">{fallback}</span>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <Skeleton 
          className={cn(
            'absolute inset-0 z-10',
            fill ? 'w-full h-full' : '',
            width && height ? `w-[${width}px] h-[${height}px]` : ''
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          fill ? 'object-cover' : ''
        )}
        onLoad={handleLoad}
        onError={handleError}
        sizes={fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined}
      />
    </div>
  );
}

// Composant d'image de profil optimisé
interface ProfileImageProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProfileImage({ src, name, size = 'md', className }: ProfileImageProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-base'
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length >= 2 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  if (!src) {
    return (
      <div className={cn(
        'flex items-center justify-center rounded-full bg-franchir-blue text-white font-medium',
        sizes[size],
        className
      )}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={cn('relative rounded-full overflow-hidden', sizes[size], className)}>
      <OptimizedImage
        src={src}
        alt={`Photo de profil de ${name}`}
        fill
        fallback={getInitials(name)}
        className="rounded-full"
      />
    </div>
  );
}
