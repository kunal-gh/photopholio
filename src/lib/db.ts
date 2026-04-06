// Simple file-based database using JSON
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const PHOTOS_FILE = path.join(DB_DIR, 'photographs.json');
const TESTIMONIALS_FILE = path.join(DB_DIR, 'testimonials.json');
const CONTACTS_FILE = path.join(DB_DIR, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize files if they don't exist
function initFile(filePath: string, defaultData: any) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
}

initFile(PHOTOS_FILE, []);
initFile(TESTIMONIALS_FILE, []);
initFile(CONTACTS_FILE, []);

// Generic read/write functions
function readData<T>(filePath: string): T[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeData<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    throw error;
  }
}

// Photographs
export interface Photograph {
  id: string;
  category: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
  featured?: boolean;
  createdAt: string;
}

export function getPhotographs(): Photograph[] {
  return readData<Photograph>(PHOTOS_FILE);
}

export function getPhotographById(id: string): Photograph | undefined {
  const photos = getPhotographs();
  return photos.find(p => p.id === id);
}

export function addPhotograph(photo: Omit<Photograph, 'id' | 'createdAt'>): Photograph {
  const photos = getPhotographs();
  const newPhoto: Photograph = {
    ...photo,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  photos.push(newPhoto);
  writeData(PHOTOS_FILE, photos);
  return newPhoto;
}

export function updatePhotograph(id: string, updates: Partial<Photograph>): Photograph | null {
  const photos = getPhotographs();
  const index = photos.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  photos[index] = { ...photos[index], ...updates };
  writeData(PHOTOS_FILE, photos);
  return photos[index];
}

export function deletePhotograph(id: string): boolean {
  const photos = getPhotographs();
  const filtered = photos.filter(p => p.id !== id);
  if (filtered.length === photos.length) return false;
  
  writeData(PHOTOS_FILE, filtered);
  return true;
}

// Testimonials
export interface Testimonial {
  id: string;
  author: string;
  text: string;
  role: string;
  avatar: string;
  rating: number;
  createdAt: string;
}

export function getTestimonials(): Testimonial[] {
  return readData<Testimonial>(TESTIMONIALS_FILE);
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  writeData(TESTIMONIALS_FILE, testimonials);
  return newTestimonial;
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  testimonials[index] = { ...testimonials[index], ...updates };
  writeData(TESTIMONIALS_FILE, testimonials);
  return testimonials[index];
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  if (filtered.length === testimonials.length) return false;
  
  writeData(TESTIMONIALS_FILE, filtered);
  return true;
}

// Contact submissions
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export function getContacts(): Contact[] {
  return readData<Contact>(CONTACTS_FILE);
}

export function addContact(contact: Omit<Contact, 'id' | 'createdAt' | 'read'>): Contact {
  const contacts = getContacts();
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  contacts.push(newContact);
  writeData(CONTACTS_FILE, contacts);
  return newContact;
}

export function markContactAsRead(id: string): boolean {
  const contacts = getContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  contacts[index].read = true;
  writeData(CONTACTS_FILE, contacts);
  return true;
}

export function deleteContact(id: string): boolean {
  const contacts = getContacts();
  const filtered = contacts.filter(c => c.id !== id);
  if (filtered.length === contacts.length) return false;
  
  writeData(CONTACTS_FILE, filtered);
  return true;
}
