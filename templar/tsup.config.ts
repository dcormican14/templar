import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // Copy CSS to dist
    const sourceCSS = path.join(__dirname, 'src/app/globals.css');
    const destCSS = path.join(__dirname, 'dist/globals.css');

    if (fs.existsSync(sourceCSS)) {
      fs.copyFileSync(sourceCSS, destCSS);
      console.log('✅ CSS copied to dist/');
    }
  }
});
