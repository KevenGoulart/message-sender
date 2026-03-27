import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      generated: resolve(__dirname, 'generated'),
    },
  },
  test: {
    setupFiles: ['dotenv/config'],
  },
});
