import { fileURLToPath, URL } from 'node:url';
// import { resolve, dirname } from 'node:path';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_APP_PUBLICPATH,
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    define: {
      'process.env': env,
    },
    build: {
      sourcemap: mode === 'production' ? false : true,
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['> 1%', 'Android 4.1', 'ios 7.1', 'Chrome > 31', 'ff > 31', 'not IE 11'],
          }),
        ],
      },
    },
    plugins: [
      vue(),
      // AutoImport({}),
      // Components({}),
      legacy({
        targets: ['> 1%', 'Android 4.1', 'ios 7.1', 'Chrome > 31', 'ff > 31', 'not IE 11'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./unit_test/vitest.init.js'],
    },
  };
});
