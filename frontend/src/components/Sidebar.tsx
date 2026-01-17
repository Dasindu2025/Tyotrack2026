'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Clock, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';
import { cn } from '@/app/layout';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Clock, label: 'Logs', href: '/logs' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Users, label: 'Manage', href: '/admin' },
  { icon: Settings, label: 'Protocol', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-background border-r border-white/[0.05] flex flex-col z-40">
      <div className="h-24 px-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shadow-glow">
          <Shield size={22} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white tracking-widest leading-none">TYOTRACK</span>
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mt-1 italic">Secure Ops</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <motion.div 
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center justify-between px-4 py-3.5 rounded-2xl group transition-all duration-300",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted hover:text-white hover:bg-white/[0.03]"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={cn("transition-colors", isActive ? "text-primary" : "text-muted group-hover:text-white")} />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active" className="w-1 h-4 bg-primary rounded-full shadow-glow" />
                )}
                {!isActive && (
                  <ChevronRight size={14} className="text-muted/20 group-hover:text-muted/40 transition-colors" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <button className="w-full p-4 glass-panel flex items-center gap-4 text-muted hover:text-danger hover:bg-danger/5 hover:border-danger/20 transition-all group rounded-2xl">
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Deactivate Session</span>
        </button>
      </div>
    </aside>
  );
}
