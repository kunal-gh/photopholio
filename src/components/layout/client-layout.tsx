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
  const isAdminPage = pathname?.startsWith('/admin') ?? false;

  return (
    <>
      {!isAdminPage && <Header />}
      <main className={cn("flex-grow", !isHomePage && !isAdminPage && "pt-14")}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
      <Toaster />
    </>
  );
}
