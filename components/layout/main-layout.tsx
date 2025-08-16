
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { ConciergeWidget } from '@/components/ui/concierge-widget';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-franchir-cream font-opensans">
      <Header onMenuClick={handleMenuClick} />
      
      <div className="flex">
        {session && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={handleSidebarClose}
          />
        )}
        
        <main className={`flex-1 transition-all duration-300 ${
          session && sidebarOpen ? 'md:ml-64' : ''
        }`}>
          {children}
        </main>
      </div>
      
      {/* Concierge Widget - visible on all pages */}
      <ConciergeWidget />
    </div>
  );
}
