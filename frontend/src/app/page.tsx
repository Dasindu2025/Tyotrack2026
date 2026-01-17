'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Shield, Zap, Lock, Globe } from 'lucide-react';

export default function LandingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(".reveal", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2 }
    );
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="relative z-10 text-center space-y-8 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] reveal">
          <Shield size={12} />
          Military-Grade Workforce Intelligence
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] reveal">
          TYOTRACK <br/>
          <span className="text-gradient">ENTERPRISE</span>
        </h1>

        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed reveal">
          The next generation of high-security time tracking. 
          Hardened infrastructure. Perceptual design. Absolute integrity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal">
          <Link href="/login" className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-glow hover:scale-105 transition-transform active:scale-95">
            Initialize Access
          </Link>
          <button className="px-10 py-4 glass-button text-white text-sm uppercase tracking-widest">
            View Protocol
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 reveal">
          {[
            { icon: Zap, label: "0ms Latency" },
            { icon: Lock, label: "AES-512 Enclave" },
            { icon: Globe, label: "Multi-Tenant" },
            { icon: Shield, label: "SOC2 Compliant" }
          ].map((item, i) => (
            <div key={i} className="p-4 glass-panel flex flex-col items-center gap-3">
              <item.icon size={20} className="text-primary" />
              <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
