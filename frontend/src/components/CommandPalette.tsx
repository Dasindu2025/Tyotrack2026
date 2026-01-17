'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Command, Zap, Database, ShieldCheck } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl glass-panel shadow-[0_32px_128px_-16px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center gap-4">
              <Terminal className="text-primary animate-pulse" size={24} />
              <input 
                autoFocus
                placeholder="Enter command or search intelligence..."
                className="bg-transparent border-none outline-none text-xl text-white placeholder:text-muted/40 w-full font-medium tracking-tight"
              />
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-muted uppercase">Esc</div>
            </div>

            <div className="p-4 space-y-1">
              {[
                { icon: ShieldCheck, label: "Audit Ledger", cmd: "check-integrity", desc: "Verify cryptographic SHA-256 chain" },
                { icon: Database, label: "Export Archives", cmd: "archive-dump", desc: "Generate multi-tenant encrypted backup" },
                { icon: Zap, label: "System Status", cmd: "monitor-live", desc: "Real-time process telemetry" },
              ].map((item, i) => (
                <button 
                  key={i}
                  className="w-full p-4 hover:bg-white/[0.05] rounded-2xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/[0.05] rounded-xl text-muted group-hover:text-primary transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white tracking-tight">{item.label}</p>
                      <p className="text-xs text-muted/60 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-muted/40 group-hover:text-primary transition-colors">/{item.cmd}</span>
                </button>
              ))}
            </div>

            <div className="p-4 bg-white/[0.02] mt-2 border-t border-white/[0.05] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted uppercase">
                  <Command size={10} /> + K
                </div>
                <span className="text-[10px] text-muted/40">to toggle</span>
              </div>
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
                Secure Enclave Active
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
