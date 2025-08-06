import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import path from 'path';
import dotenvExpand from 'dotenv-expand';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения и расширяем их с помощью dotenv-expand
  const env = loadEnv(mode, process.cwd(), '');
  dotenvExpand.expand({ parsed: env });

  return {
    plugins: [react(), imagetools()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './') },
        { find: /lucide-react@.+$/, replacement: 'lucide-react' },
        { find: /sonner@.+$/, replacement: 'sonner' },
      ],
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
