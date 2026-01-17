'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '@/app/layout';

interface Notification {
  id: string;
  type: 'alert' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    { id: '1', type: 'alert', title: 'System Hardened', message: 'Rate limiting active on all edge nodes.', time: '2m ago' },
    { id: '2', type: 'success', title: 'Ledger Audit Complete', message: 'All transactions verified and hashed.', time: '14m ago' },
    { id: '3', type: 'info', title: 'Policy Update', message: 'Revised working hour thresholds applied.', time: '1h ago' },
  ]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-2xl transition-all active:scale-95 group"
      >
        <Bell size={20} className="text-muted group-hover:text-white transition-colors" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-glow animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-[380px] z-50 glass-panel p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Intelligence Inbox</h3>
                <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white"><X size={18} /></button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {notifications.map((n) => (
                  <motion.div 
                    key={n.id}
                    whileHover={{ x: 4 }}
                    className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl flex gap-4 items-start group hover:bg-white/[0.06] transition-all"
                  >
                    <div className={cn(
                      "p-2 rounded-xl mt-0.5",
                      n.type === 'alert' ? "bg-danger/10 text-danger" : 
                      n.type === 'success' ? "bg-success/10 text-success" : 
                      "bg-primary/10 text-primary"
                    )}>
                      {n.type === 'alert' ? <ShieldAlert size={16} /> : n.type === 'success' ? <CheckCircle size={16} /> : <Info size={16} />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white leading-none">{n.title}</span>
                        <span className="text-[10px] font-medium text-muted/60 uppercase">{n.time}</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{n.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-xs font-bold text-muted transition-all uppercase tracking-widest">
                Clear All Signals
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
