import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import CommandPalette from '@/components/CommandPalette'

const inter = Inter({ subsets: ['latin'] })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const metadata: Metadata = {
  title: 'Tyotrack Enterprise | AAA Workforce Intelligence',
  description: 'Enterprise-grade workforce time tracking and audit platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "antialiased")}>
        <CommandPalette />
        {children}
      </body>
    </html>
  )
}
