export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string | null;
  imageUrl: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string | null;
  icon?: string | null;
  features: string[];
  order: number;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Form types
export interface ProjectFormData {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
}

export interface ServiceFormData {
  title: string;
  description: string;
  price?: string;
  icon?: string;
  features: string[];
  order: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}