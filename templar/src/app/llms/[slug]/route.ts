import { NextResponse } from 'next/server';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { buildSlugMap } from '../components';

export const dynamic = 'force-dynamic';

const DOCS_ROOT = join(process.cwd(), 'src', 'app');

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const key = slug.replace(/\.txt$/, '').toLowerCase();
  const slugMap = buildSlugMap();
  const relativePath = slugMap[key];

  if (!relativePath) {
    const available = Object.keys(slugMap).map((s) => `  - /llms/${s}.txt`).join('\n');
    return new NextResponse(
      `# Not Found\n\nNo documentation found for "${slug}".\n\n## Available endpoints\n\n${available}\n`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }

  const fullPath = join(DOCS_ROOT, relativePath);
  if (!existsSync(fullPath)) {
    return new NextResponse(`# Not Found\n\nFile not found on disk: ${relativePath}\n`, {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const content = readFileSync(fullPath, 'utf-8');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
