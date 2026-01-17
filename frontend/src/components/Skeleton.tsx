'use client';

import { cn } from '@/lib/utils';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("skeleton w-full h-8", className)} />
  );
};

export const SummaryCardSkeleton = () => (
  <div className="premium-card p-6 min-h-[160px] space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2 w-1/2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="w-12 h-12 rounded-2xl" />
    </div>
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  </div>
);
