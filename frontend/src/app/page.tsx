'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="hero-content text-center max-w-4xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wide uppercase"
        >
          Enterprise Workforce Intelligence
        </motion.div>
        
        <h1 className="text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Master Your <span className="text-gradient">Workforce Time</span> <br /> 
          with Absolute Precision.
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Production-ready, multi-tenant workforce management for the modern enterprise. 
          Audit-safe, highly automated, and designed for extreme scale.
        </p>

        <div className="flex items-center justify-center gap-6 pt-8">
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
            Launch Platform
          </button>
          <button className="px-8 py-4 bg-secondary text-white rounded-xl font-semibold border border-white/10 hover:bg-secondary/80 transition-all">
            Documentation
          </button>
        </div>
      </div>
    </main>
  );
}
