
'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-franchir-cream/60',
        className
      )}
      {...props}
    />
  );
}

// Composants skeleton spécialisés
export function CardSkeleton() {
  return (
    <div className="bg-franchir-white border border-franchir-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-franchir-white border border-franchir-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-8 w-[60px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="bg-franchir-white border border-franchir-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[120px]" />
              <Skeleton className="h-3 w-[140px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-3 w-[130px]" />
              <Skeleton className="h-3 w-[180px]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="space-y-4">
      {/* Message reçu */}
      <div className="flex justify-start">
        <div className="flex items-end gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="max-w-xs space-y-2">
            <Skeleton className="h-16 w-[200px] rounded-2xl" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
      </div>
      
      {/* Message envoyé */}
      <div className="flex justify-end">
        <div className="max-w-xs space-y-2">
          <Skeleton className="h-12 w-[150px] rounded-2xl" />
          <Skeleton className="h-3 w-[60px] ml-auto" />
        </div>
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className="p-3 space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className="relative">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[120px]" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-[40px]" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-3 w-[180px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="bg-franchir-white rounded-lg p-6 border border-franchir-border">
        <div className="flex items-center gap-6">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[400px]" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CardSkeleton />
        </div>
        <div className="space-y-4">
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
