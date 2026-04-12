"use client";

import { Star, ExternalLink, MapPin, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedHero } from "@/components/home/animated-hero";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { usePhotographs, useTestimonials, useSettings } from "@/lib/data-provider";
import { ContactForm } from "@/components/contact/contact-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PretextHeading } from "@/components/ui/pretext-heading";
import React, { useMemo, useState, useEffect } from "react";
import { useIsMobile } from "@/lib/hooks";

interface Section {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  photoCount?: number;
}

// Adaptive grid class based on total section count
function getSectionGridClass(index: number, total: number): string {
  if (total <= 2) return "md:col-span-10 md:row-span-2";
  if (total <= 4) {
    const patterns = [
      "md:col-span-6 md:row-span-2",
      "md:col-span-4 md:row-span-2",
      "md:col-span-4 md:row-span-2",
      "md:col-span-6 md:row-span-2",
    ];
    return patterns[index % 4] ?? "md:col-span-5 md:row-span-2";
  }
  if (total <= 6) {
    const patterns = [
      "md:col-span-10 md:row-span-2",
      "md:col-span-4 md:row-span-2",
      "md:col-span-6 md:row-span-2",
      "md:col-span-7",
      "md:col-span-3",
      "md:col-span-10 md:row-span-2",
    ];
    return patterns[index] ?? "md:col-span-5";
  }
  return ""; // 7+ uses 3-col grid, no extra class needed
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : ""}`} />
    ))}
  </div>
);

function TestimonialsSection() {
  const { data: testimonialsFromDB, isLoading } = useTestimonials();
  return (
    <section id="testimonials" className="py-20 md:py-28 lg:py-32 bg-background scroll-mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Client Voices</h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">Words from those who have seen through my eye.</p>
        </div>
        {isLoading && <p className="text-center text-muted-foreground">Loading testimonials...</p>}
        {testimonialsFromDB && testimonialsFromDB.length > 0 && (
          <Carousel opts={{ align: "center", loop: true, dragFree: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {testimonialsFromDB.map((t, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                  <Card className="h-full flex flex-col items-center text-center p-8 bg-card/20 rounded-lg">
                    <Avatar className="w-24 h-24 mb-6">
                      <AvatarImage src={t.avatar} alt={t.author} />
                      <AvatarFallback>{t.author[0]}</AvatarFallback>
                    </Avatar>
                    <CardContent className="p-0 flex-grow">
                      <p className="text-base italic text-foreground/70 mb-6">"{t.text}"</p>
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-headline text-xl font-semibold text-foreground">{t.author}</h3>
                        {t.sourceUrl && (
                          <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title="Verified Review">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
                      {t.rating && <div className="mt-4"><StarRating rating={t.rating} /></div>}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const { data: photographs } = usePhotographs();
  const isMobile = useIsMobile();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch("/api/sections")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSections(data.filter((s: Section) => s.slug !== "archived"));
        }
      })
      .catch(() => {});
  }, []);

  const heroImages = useMemo(() => photographs?.filter(p => p.featured).slice(0, 3) ?? [], [photographs]);

  return (
    <div className="bg-background text-foreground w-full overflow-x-hidden">
      {/* Hero */}
      <section id="home" className="w-full">
        <div className="relative w-full h-screen flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 shadow-2xl">
            {heroImages.length > 0 && <AnimatedHero images={heroImages as any} />}
          </div>
          <div className="relative z-10 p-4 w-full flex flex-col items-center">
            <PretextHeading
              text="Capturing Life's Fleeting Moments"
              className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white/90 drop-shadow-md leading-[1.1] max-w-6xl"
              font={isMobile ? "48px var(--font-headline)" : "100px var(--font-headline)"}
            />
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-body text-white/80 drop-shadow-sm">
              Visual stories, captured with soul.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-20 md:py-28 lg:py-32 scroll-mt-12">
        <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">My Work</h2>
        </div>
        <div className="container mx-auto px-2">
          {sections.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Portfolio coming soon.</p>
          ) : (
            <div className={`grid grid-cols-1 auto-rows-[20rem] gap-4 ${sections.length >= 7 ? "md:grid-cols-3" : "md:grid-cols-10"}`}>
              {sections.map((section, index) => {
                const secPhotos = photographs?.filter(
                  p => p.section.toLowerCase() === section.name.toLowerCase()
                );
                const cover = secPhotos?.[0] ?? { imageUrl: "https://placehold.co/600x400", description: section.name };
                const gridClass = sections.length >= 7 ? "" : getSectionGridClass(index, sections.length);
                return (
                  <PortfolioCard
                    key={section.id}
                    slug={section.slug}
                    title={section.name}
                    description={section.description ?? `Explore ${section.name} photography`}
                    coverImage={cover as any}
                    className={gridClass}
                    sharp={true}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Separator className="my-12" />
      <TestimonialsSection />

      <Separator className="my-12" />
      {/* Contact Section */}
      <section id="contact" className="pt-20 pb-48 md:pt-28 md:pb-64 lg:pt-32 lg:pb-96 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Get in Touch</h2>
            <p className="mt-6 max-w-lg mx-auto text-lg text-muted-foreground">
              Let's create something beautiful together. Reach out for bookings, collaborations, or simply to say hello.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-8">
              <div className="bg-card/30 p-8 rounded-2xl border border-border/50">
                <h3 className="text-2xl font-headline font-semibold mb-6">Direct Channels</h3>
                <div className="space-y-6">
                  {(() => {
                    const { data: settings } = useSettings();
                    return (
                      <>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                            <a href={`mailto:${settings?.email || "hello@example.com"}`} className="text-lg hover:text-primary transition-colors">
                              {settings?.email || "hello@example.com"}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                            <a href={`tel:${settings?.phone || "+1234567890"}`} className="text-lg hover:text-primary transition-colors">
                              {settings?.phone || "Phone number not set"}
                            </a>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Studio</p>
                      <p className="text-lg">Based in New York City,<br/>Available Worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card/10 p-8 rounded-2xl border border-border/50">
              <h3 className="text-2xl font-headline font-semibold mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}