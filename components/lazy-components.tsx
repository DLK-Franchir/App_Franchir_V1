
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingState, InlineLoadingState } from '@/components/ui/loading-states';
import { DashboardSkeleton, MessageSkeleton, ContactSkeleton, TableRowSkeleton } from '@/components/ui/loading-skeleton';

// Lazy loading des composants lourds avec fallbacks optimisés
export const LazyChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.ResponsiveContainer })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] bg-franchir-white border border-franchir-border rounded-lg p-4">
        <InlineLoadingState message="Chargement du graphique..." />
      </div>
    ),
  }
);

export const LazyMessagesList = dynamic(
  () => import('@/app/messages/page').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-franchir-white border border-franchir-border rounded-lg p-4">
        <MessageSkeleton />
      </div>
    ),
  }
);

export const LazyContactsList = dynamic(
  () => import('@/components/ui/loading-skeleton').then(() => ({
    default: () => (
      <div className="bg-franchir-white border border-franchir-border rounded-lg">
        <ContactSkeleton />
      </div>
    )
  })),
  {
    ssr: false,
    loading: () => <InlineLoadingState message="Chargement des contacts..." />,
  }
);

export const LazyPatientsList = dynamic(
  () => import('@/app/patients/page').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    ),
  }
);

// Composant générique pour lazy loading avec skeleton personnalisé
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyWrapper({ children, fallback, className }: LazyWrapperProps) {
  return (
    <div className={className}>
      <React.Suspense fallback={fallback || <InlineLoadingState />}>
        {children}
      </React.Suspense>
    </div>
  );
}
