import { NextResponse } from 'next/server';
import { getComponents, STATIC_DOCS } from '../llms/components';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mournshire.vercel.app';

export async function GET() {
  const components = getComponents();
  const atoms = components.filter((c) => c.category === 'atom');
  const molecules = components.filter((c) => c.category === 'molecule');

  const docLines = STATIC_DOCS.map(
    (d) => `- ${d.label}: ${BASE_URL}/llms/${d.slug}.txt`
  ).join('\n');

  const atomLines = atoms.map(
    (c) => `- ${c.name}: ${BASE_URL}/llms/${c.slug}.txt`
  ).join('\n');

  const moleculeLines = molecules.map(
    (c) => `- ${c.name}: ${BASE_URL}/llms/${c.slug}.txt`
  ).join('\n');

  const manifest = `# Templar Component Library

> Templar is a React component library built with Next.js 15, featuring an atomic design system with advanced theming capabilities.

## Documentation

${docLines}

## Atomic Components

${atomLines}

## Molecule Components

${moleculeLines}

## Full Context

For a single file containing all documentation: ${BASE_URL}/llms-full.txt
`;

  return new NextResponse(manifest, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
