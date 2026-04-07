'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <Header />
      <main className={cn("flex-grow", !isHomePage && "pt-14")}>
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
