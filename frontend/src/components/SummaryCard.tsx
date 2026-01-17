'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TiltCard } from './TiltCard';

interface SummaryCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

export default function SummaryCard({ label, value, subValue, icon: Icon, trend, className }: SummaryCardProps) {
  return (
    <TiltCard className={cn("p-6", className)}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted/60">{label}</p>
            <h3 className="text-4xl font-bold tracking-tighter text-white">{value}</h3>
          </div>
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl text-primary shadow-glow">
            <Icon size={24} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {subValue && <span className="text-sm font-medium text-muted">{subValue}</span>}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border",
              trend.isUp 
                ? "bg-success/10 text-success border-success/20" 
                : "bg-danger/10 text-danger border-danger/20"
            )}>
              <span className={cn("w-1 h-1 rounded-full animate-pulse", trend.isUp ? "bg-success" : "bg-danger")} />
              {trend.isUp ? 'Incr' : 'Decr'} {trend.value}%
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Decorative background pulse */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
    </TiltCard>
  );
}
