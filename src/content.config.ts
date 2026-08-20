import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    evidenceType: z.enum(['Professional Experience', 'Project-Based Internship', 'Technical Assessment']),
    organization: z.string(),
    industry: z.string(),
    role: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()).min(1),
    categories: z.array(z.enum(['Analytics & Automation', 'Business Intelligence', 'Commercial & Operations', 'Machine Learning', 'Sustainability'])).min(1),
    featured: z.boolean(),
    confidential: z.boolean(),
    confidentialityNote: z.string().optional(),
    evidenceStatus: z.enum(['PROTECTED DETAILS', 'RECONSTRUCTED VIEW', 'SYNTHETIC DATA', 'PUBLIC PROJECT']),
    evidenceNote: z.string().trim().min(1),
    assumptionsConstraints: z.array(z.string().trim().min(1)).min(2).max(4),
    decisionLog: z.array(z.object({
      decision: z.string().trim().min(1),
      why: z.string().trim().min(1),
    })).min(2).max(3),
    dictionary: z.array(z.object({
      term: z.string().trim().min(1),
      definition: z.string().trim().min(1),
    })).min(2).max(8).optional(),
    coverImage: z.string(),
    coverAlt: z.string(),
    keyContributions: z.array(z.string()).min(1).max(6).optional(),
    outcomes: z.array(z.string()).max(3),
    relatedAssets: z.array(z.discriminatedUnion('available', [
      z.object({
        label: z.string(),
        type: z.enum(['image', 'document', 'repository', 'methodology']),
        href: z.string().min(1),
        available: z.literal(true),
        note: z.string().optional(),
      }),
      z.object({
        label: z.string(),
        type: z.enum(['image', 'document', 'repository', 'methodology']),
        href: z.string().optional(),
        available: z.literal(false),
        note: z.string().optional(),
      }),
    ])),
  }),
});

export const collections = { work };
