'use client';

import SummaryCard from '@/components/SummaryCard';
import { Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
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
  { name: 'Sat', hours: 0 },
  { name: 'Sun', hours: 0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          label="Total Hours (Week)" 
          value="41.5h" 
          subValue="Goal: 40h"
          icon={Clock} 
          trend={{ value: 12, isUp: true }}
        />
        <SummaryCard 
          label="Approved Entries" 
          value="15" 
          icon={CheckCircle2} 
        />
        <SummaryCard 
          label="Pending Approval" 
          value="3" 
          icon={AlertCircle} 
          className="border-amber-500/20"
        />
        <SummaryCard 
          label="Efficiency Score" 
          value="94%" 
          icon={TrendingUp} 
          trend={{ value: 2, isUp: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-white">Weekly Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="hours" fill="6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-white">Productivity Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
