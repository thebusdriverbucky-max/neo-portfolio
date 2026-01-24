import { z } from 'zod';

// ============================================
// PROJECT SCHEMAS
// ============================================

// Схема для создания (POST) - все обязательные поля
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  demoUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string()),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

// Схема для обновления (PUT/PATCH) - все поля опциональны
export const partialProjectSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type PartialProjectInput = z.infer<typeof partialProjectSchema>;

// ============================================
// SERVICE SCHEMAS
// ============================================

// Схема для создания сервиса
export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  features: z.array(z.string()),
  icon: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

// Схема для обновления сервиса
export const partialServiceSchema = serviceSchema.partial();

export type ServiceInput = z.infer<typeof serviceSchema>;
export type PartialServiceInput = z.infer<typeof partialServiceSchema>;
