import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively resolves CSS @import statements, inlining their contents.
 * Skips non-relative imports (e.g. "tailwindcss") so they remain as-is.
 */
function inlineCSSImports(cssContent: string, cssDir: string): string {
  return cssContent.replace(
    /^@import\s+['"](.+?)['"]\s*;/gm,
    (_match, importPath) => {
      // Skip non-relative imports (packages like "tailwindcss")
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        return _match;
      }
      const resolved = path.resolve(cssDir, importPath);
      if (!fs.existsSync(resolved)) {
        console.warn(`⚠️  CSS import not found: ${resolved}`);
        return `/* import not found: ${importPath} */`;
      }
      const importedCSS = fs.readFileSync(resolved, 'utf-8');
      const importedDir = path.dirname(resolved);
      // Recursively inline nested imports
      return `/* --- inlined from ${importPath} --- */\n${inlineCSSImports(importedCSS, importedDir)}\n/* --- end ${importPath} --- */`;
    }
  );
}

export default defineConfig({
  entry: {
    // Main entry point
    index: 'src/app/components/index.ts',
    // Provider entry
    providers: 'src/app/providers/index.tsx',
    // Environment entry
    environment: 'src/app/environment/index.ts',
    // Atoms
    'components/atoms': 'src/app/components/atoms/index.ts',
    // Molecules
    'components/molecules': 'src/app/components/molecules/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // Disable for now due to incremental build issues
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    'iconoir-react',
  ],
  treeshake: true,
  minify: false, // Keep readable for debugging
  outDir: 'dist',
  onSuccess: async () => {
    // Inline all CSS imports into a single globals.css for dist
    const sourceCSS = path.join(__dirname, 'src/app/globals.css');
    const destCSS = path.join(__dirname, 'dist/globals.css');

    if (fs.existsSync(sourceCSS)) {
      const rawCSS = fs.readFileSync(sourceCSS, 'utf-8');
      const cssDir = path.dirname(sourceCSS);
      const inlinedCSS = inlineCSSImports(rawCSS, cssDir);
      fs.writeFileSync(destCSS, inlinedCSS, 'utf-8');
      console.log('✅ CSS inlined and written to dist/globals.css');
    }
  }
});
