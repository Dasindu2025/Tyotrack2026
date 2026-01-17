import React from 'react';
import Sidebar from '@/components/Sidebar';
import NotificationCenter from '@/components/NotificationCenter';
import PageTransition from '@/components/PageTransition';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-10 bg-background/50 backdrop-blur-xl z-30">
          <div className="flex items-center gap-6">
            <div className="w-1.5 h-6 bg-primary rounded-full animate-pulse shadow-glow" />
            <h2 className="text-xl font-bold tracking-tight text-white">Platform Overview</h2>
          </div>
          <div className="flex items-center gap-6">
            <NotificationCenter />
            <div className="flex items-center gap-3 pl-6 border-l border-white/[0.08]">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-white leading-none">Admiral Sithmira</p>
                <p className="text-[10px] font-medium text-primary uppercase tracking-tighter mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 p-[2px] shadow-glow">
                <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center text-white font-black text-xs">
                  AS
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
