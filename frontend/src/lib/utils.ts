import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  slug: string;
}

export interface Provider {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  rating: number;
  reviews_count: number;
  price_range: string | null;
  phone: string | null;
  email: string | null;
  image_url: string | null;
  skills: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  year: number;
}

export interface ProviderApplicationIn {
  name: string;
  phone: string;
  email: string;
  category: string;
  skills: string[];
  price_range: string;
  credentials: Credential[];
  experience: string;
}
