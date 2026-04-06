"use client";
import { SessionProvider } from "next-auth/react";
import { DataProvider } from "@/lib/data-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </SessionProvider>
  );
}