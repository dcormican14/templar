import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DOCS_ROOT = join(process.cwd(), 'src', 'app');

const SKIP = new Set(['index.ts', 'shared', 'types', 'STRUCTURE.md']);

export interface ComponentEntry {
  name: string;
  slug: string;
  category: 'atom' | 'molecule';
  relativePath: string; // relative to DOCS_ROOT
}

export interface StaticDocEntry {
  slug: string;
  label: string;
  relativePath: string;
}

export const STATIC_DOCS: StaticDocEntry[] = [
  { slug: 'design-standards',        label: 'Design Standards',         relativePath: 'docs/COMPONENT_DESIGN_STANDARDS.md' },
  { slug: 'css-variables',           label: 'CSS Variables',            relativePath: 'docs/CSS_VARIABLES.md' },
  { slug: 'element-library-overview',label: 'Component Library Overview',relativePath: 'docs/ELEMENT_LIBRARY_OVERVIEW.md' },
  { slug: 'mourn-configuration',     label: 'Mourn Configuration',      relativePath: 'docs/MOURN_CONFIGURATION.md' },
  { slug: 'atoms-structure',         label: 'Atoms Structure Guide',    relativePath: 'components/atoms/STRUCTURE.md' },
];

function scanCategory(category: 'atom' | 'molecule'): ComponentEntry[] {
  const dir = join(DOCS_ROOT, 'components', category === 'atom' ? 'atoms' : 'molecules');
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SKIP.has(d.name))
    .filter((d) => existsSync(join(dir, d.name, 'README.md')))
    .map((d) => ({
      name: d.name,
      slug: d.name.toLowerCase(),
      category,
      relativePath: `components/${category === 'atom' ? 'atoms' : 'molecules'}/${d.name}/README.md`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getComponents(): ComponentEntry[] {
  return [...scanCategory('atom'), ...scanCategory('molecule')];
}

export function buildSlugMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const doc of STATIC_DOCS) {
    map[doc.slug] = doc.relativePath;
  }
  for (const comp of getComponents()) {
    map[comp.slug] = comp.relativePath;
  }
  return map;
}

export function readDoc(relativePath: string): string {
  const { readFileSync } = require('fs') as typeof import('fs');
  const fullPath = join(DOCS_ROOT, relativePath);
  if (!existsSync(fullPath)) return '';
  return readFileSync(fullPath, 'utf-8');
}
