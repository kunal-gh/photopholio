'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Photograph {
  id: string;
  section: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageKitFileId: string;
  width?: number;
  height?: number;
  tags?: string;
  featured?: boolean;
  uploadedAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  role: string;
  avatar: string;
  rating: number;
  createdAt: string;
}

interface DataContextValue {
  photographs: Photograph[];
  testimonials: Testimonial[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [photographs, setPhotographs] = useState<Photograph[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [photosRes, testimonialsRes] = await Promise.all([
        fetch('/api/photographs'),
        fetch('/api/testimonials')
      ]);
      
      const photos = await photosRes.json();
      const testimonials = await testimonialsRes.json();
      
      setPhotographs(photos);
      setTestimonials(testimonials);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ photographs, testimonials, isLoading, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

// Helper hooks for specific data
export function usePhotographs(section?: string) {
  const { photographs, isLoading } = useData();
  const filtered = section 
    ? photographs.filter(p => p.section === section)
    : photographs;
  return { data: filtered, isLoading };
}

export function useTestimonials() {
  const { testimonials, isLoading } = useData();
  return { data: testimonials, isLoading };
}
