'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/app/layout';

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
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4 }}
      className={cn("p-6 glass-panel rounded-2xl relative overflow-hidden group", className)}
    >
      <div className="absolute top-0 right-0 p-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
        {trend && (
          <div className={cn(
            "text-xs font-bold px-2 py-1 rounded-full",
            trend.isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
          )}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>
    </motion.div>
  );
}
