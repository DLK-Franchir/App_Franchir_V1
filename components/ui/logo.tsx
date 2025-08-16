'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 }, 
    lg: { width: 60, height: 60 }
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <Image 
          src="https://cdn.abacus.ai/images/90332d36-58b6-461a-b071-5990d1bcd0f3.png"
          alt="Franchir Logo"
          width={sizes[size].width}
          height={sizes[size].height}
          className="object-contain"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-franchir-blue ${textSizes[size]} font-montserrat`}>
            Franchir
          </span>
          {size === 'lg' && (
            <span className="text-sm text-franchir-secondary -mt-1 font-opensans">
              Conciergerie médicale premium
            </span>
          )}
        </div>
      )}
    </div>
  );
}
