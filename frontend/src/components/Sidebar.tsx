'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Clock, 
  Users, 
  Building2, 
  FileBarChart, 
  ShieldCheck, 
  Settings,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/layout';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Clock, label: 'Time Entries', href: '/time-entries' },
  { icon: Users, label: 'Teams', href: '/teams', roles: ['company_admin', 'manager'] },
  { icon: Building2, label: 'Company', href: '/company', roles: ['company_admin'] },
  { icon: FileBarChart, label: 'Reports', href: '/reports' },
  { icon: ShieldCheck, label: 'Platform', href: '/platform', roles: ['super_admin'] },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen bg-secondary/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/30">
          T
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Tyotrack</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
}
