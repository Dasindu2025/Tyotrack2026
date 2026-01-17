'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Calendar, ShieldCheck, Activity } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { Skeleton } from '@/components/Skeleton';

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-[10px]">
            <ShieldCheck size={12} />
            Verified Archives
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Intelligence Reports</h1>
        </div>
        
        <div className="flex gap-4">
          <button className="glass-button flex items-center gap-2 text-xs uppercase tracking-widest border-white/5">
            <Filter size={14} /> Filter Logic
          </button>
          <button className="glass-button flex items-center gap-2 text-xs uppercase tracking-widest border-white/5">
            <Calendar size={14} /> Time Horizon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Personnel Attendance", desc: "Detailed breakdown of ingress/egress units.", type: "PDF" },
          { title: "Resource Allocation", desc: "Project load distribution across sectors.", type: "XLS" },
          { title: "Security Audit Log", desc: "Cryptographic chain of all system events.", type: "Verified PDF" },
        ].map((report, i) => (
          <TiltCard key={i} className="p-8 space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{report.title}</h3>
                <p className="text-sm text-muted leading-relaxed mt-2">{report.desc}</p>
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              className="w-full py-4 bg-white/[0.05] hover:bg-primary hover:text-white border border-white/10 hover:border-primary/50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Download size={14} /> 
              {isGenerating ? "Encrypting..." : `Download ${report.type}`}
            </button>
          </TiltCard>
        ))}
      </div>

      <div className="premium-card p-10 border-primary/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black text-white tracking-tighter">Automated Intelligence Pipeline</h2>
            <p className="text-muted max-w-xl">
              Configure automated delivery of restricted documents to relevant sector heads via encrypted protocols.
            </p>
            <div className="flex gap-4 pt-4 justify-center md:justify-start">
              <span className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-[10px] font-bold uppercase tracking-tighter">Active</span>
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-tighter">Next Sync: 0400h</span>
            </div>
          </div>
          <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
            Configure Pipeline
          </button>
        </div>
        
        {/* Decorative elements */}
        <Activity className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
      </div>
    </div>
  );
}
