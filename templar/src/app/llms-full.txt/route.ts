import { NextResponse } from 'next/server';
import { getComponents, STATIC_DOCS, readDoc } from '../llms/components';

export const dynamic = 'force-dynamic';

const SEPARATOR = '\n\n---\n\n';

export async function GET() {
  const components = getComponents();

  const sections: string[] = [
    `# Templar Component Library — Full Documentation\n\nGenerated from source. All documentation for Templar's component library, design standards, and configuration system.\n`,
    ...STATIC_DOCS.map((d) => `## ${d.label}\n\n${readDoc(d.relativePath)}`),
    ...components.map((c) => `## ${c.name}\n\n${readDoc(c.relativePath)}`),
  ];

  const body = sections.filter(Boolean).join(SEPARATOR);

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
