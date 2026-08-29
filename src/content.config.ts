import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Jede .md-Datei in src/content/posts/ = ein Post = eine eigene URL.
// Der Dateiname wird zum Slug: soares.md -> /posts/soares
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    work: z.string().optional(),
    author: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
