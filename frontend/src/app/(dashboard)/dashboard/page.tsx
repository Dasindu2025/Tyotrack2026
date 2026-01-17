'use client';

import { useState, useEffect } from 'react';
import SummaryCard from '@/components/SummaryCard';
import { SummaryCardSkeleton } from '@/components/Skeleton';
import { Clock, CheckCircle2, AlertCircle, TrendingUp, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', hours: 8 },
  { name: 'Tue', hours: 7.5 },
  { name: 'Wed', hours: 9 },
  { name: 'Thu', hours: 8 },
  { name: 'Fri', hours: 8.5 },
  { name: 'Sat', hours: 2 },
  { name: 'Sun', hours: 0 },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-[10px]">
            <Activity size={12} className="animate-pulse" />
            Live Intelligence
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Command Centre</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted">Weekly Progress</p>
          <div className="w-48 h-2 bg-white/5 rounded-full mt-2 overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 1.5, ease: 'circOut' }}
              className="h-full bg-primary shadow-glow" 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <SummaryCardSkeleton key={i} />)
          ) : (
            <>
              <SummaryCard 
                label="Total Ops (Week)" 
                value="41.5h" 
                subValue="Quota: 40h"
                icon={Clock} 
                trend={{ value: 12, isUp: true }}
              />
              <SummaryCard 
                label="Verified Units" 
                value="15" 
                icon={CheckCircle2} 
              />
              <SummaryCard 
                label="Action Required" 
                value="3" 
                icon={AlertCircle} 
                className="border-danger/20"
              />
              <SummaryCard 
                label="Operational Index" 
                value="98.2" 
                icon={TrendingUp} 
                trend={{ value: 4, isUp: true }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-tight">Performance Vector</h3>
            <button className="glass-button text-[10px] uppercase tracking-widest">Detail View</button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.65 0.22 260)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(0.65 0.22 260)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'oklch(0.24 0.04 240)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '12px' }} 
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="oklch(0.65 0.22 260)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-tight">Resource Allocation</h3>
            <button className="glass-button text-[10px] uppercase tracking-widest text-primary font-bold">Download Analysis</button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'oklch(0.24 0.04 240)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px' }} 
                />
                <Bar dataKey="hours" fill="oklch(0.7 0.18 160)" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
