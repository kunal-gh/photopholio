"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone, Star, Instagram, Twitter, Facebook } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { Separator } from "@/components/ui/separator";
import { AnimatedHero } from "@/components/home/animated-hero";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { usePhotographs, useTestimonials } from "@/lib/data-provider";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PretextHeading } from "@/components/ui/pretext-heading";
import React, { useMemo } from "react";

const SECTIONS = [
  { slug: "weddings", title: "Weddings", description: "Capturing the magic of your special day with timeless elegance.", className: "md:col-span-10 md:row-span-2", sharp: true },
  { slug: "portraits", title: "Portraits", description: "Revealing the essence of personality through captivating portraits.", className: "md:col-span-4 md:row-span-2", sharp: true },
  { slug: "street", title: "Street", description: "Finding extraordinary stories in ordinary city life.", className: "md:col-span-6 md:row-span-2", sharp: true },
  { slug: "fashion", title: "Fashion", description: "Bringing your creative vision to life with striking imagery.", className: "md:col-span-7", sharp: true },
  { slug: "thats-ai", title: "Thats AI", description: "Exploring the frontiers of creativity with AI-generated imagery.", className: "md:col-span-3", sharp: true },
  { slug: "live-events", title: "Live Events", description: "Documenting the energy and emotion of every occasion.", className: "md:col-span-10 md:row-span-2", sharp: true },
];

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={i < rating ? "fill-current" : ""} />)}
  </div>
);

function TestimonialsSection() {
  const { data: testimonialsFromDB, isLoading } = useTestimonials();
  
  return (
    <section id="testimonials" className="py-20 md:py-28 lg:py-32 bg-background">
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
                    <Avatar className="w-24 h-24 mb-6"><AvatarImage src={t.avatar} alt={t.author} /><AvatarFallback>{t.author[0]}</AvatarFallback></Avatar>
                    <CardContent className="p-0 flex-grow">
                      <p className="text-base italic text-foreground/70 mb-6">"{t.text}"</p>
                      <h3 className="font-headline text-xl font-semibold text-foreground">{t.author}</h3>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                      {t.rating && <div className="mt-4"><Rating rating={t.rating} /></div>}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" /><CarouselNext className="hidden md:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const { data: photographs } = usePhotographs();
  
  const heroImages = useMemo(() => {
    return photographs?.filter(p => p.featured).slice(0, 3) || [];
  }, [photographs]);

  const bioImages = useMemo(() => {
    return photographs?.filter(p => !p.featured).slice(0, 3) || [];
  }, [photographs]);

  return (
    <div className="bg-background text-foreground w-full overflow-x-hidden">
      <section id="home" className="w-full">
        <div className="relative w-full h-screen flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 shadow-2xl">
            {heroImages && heroImages.length > 0 && <AnimatedHero images={heroImages as any} />}
          </div>
          
          <div className="relative z-10 p-4 w-full flex flex-col items-center">
            <PretextHeading 
              text="Capturing Life's Fleeting Moments" 
              className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white/90 drop-shadow-md leading-[1.1] max-w-6xl"
              font="100px var(--font-headline)"
            />
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-body text-white/80 drop-shadow-sm">
              Visual stories, captured with soul.
            </p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">My Work</h2>
        </div>
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 md:grid-cols-10 auto-rows-[20rem] gap-4">
            {SECTIONS.map((section) => {
              const secPhotos = photographs?.filter(p => p.section.toLowerCase() === section.title.toLowerCase());
              const cover = secPhotos?.[0] || { imageUrl: "https://placehold.co/600x400", description: section.title };
              return (
                <PortfolioCard 
                  key={section.slug} slug={section.slug} title={section.title} description={section.description} 
                  coverImage={cover as any} className={section.className} sharp={section.sharp} 
                />
              );
            })}
          </div>
        </div>
      </section>
      
      <Separator className="my-12" />
      <TestimonialsSection />
    </div>
  );
}