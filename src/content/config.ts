import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Equipo Safari Tanzania'),
    authorSlug: z.string().default('equipo-safari'),
    category: z.enum(['guias', 'naturaleza', 'actividades', 'hospedaje', 'cultura', 'consejos']),
    tags: z.array(z.string()),
    image: z.string(),
    imageAlt: z.string(),
    silo: z.enum([
      'safaris-tanzania',
      'actividades-aventura',
      'hospedaje-lodges',
      'guias-viaje',
      'cultura-masai',
    ]),
    relatedPosts: z.array(z.string()).optional(),
    faqSchema: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
    readingTime: z.number().optional(),
    lang: z.enum(['es', 'en']).default('es'),
  }),
});

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string(),
    expertise: z.array(z.string()),
    social: z
      .object({
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        tiktok: z.string().optional(),
        pinterest: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, authors };
