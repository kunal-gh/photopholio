
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClientLayout } from '@/components/layout/client-layout';
import { Providers } from '@/components/providers';
import { ImageKitProvider } from '@/components/imagekit-provider';

export const metadata: Metadata = {
  title: "Through Hardik's Eye",
  description: 'A personal photography portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col bg-background text-foreground')}>
        <Providers>
          <ImageKitProvider>
            <ClientLayout>{children}</ClientLayout>
          </ImageKitProvider>
        </Providers>
      </body>
    </html>
  );
}
