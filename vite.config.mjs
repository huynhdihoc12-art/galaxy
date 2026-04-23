import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  optimizeDeps: {
    include: [],
  },
  plugins: [
    {
      // Inject jQuery as global before any other script
      name: 'jquery-global',
      transformIndexHtml(html) {
        return html.replace(
          '<script type="module" src="/main.js"></script>',
          `<script>
  // Ensure jQuery global is available for legacy scripts
  window.__jqReady = false;
</script>
<script type="module" src="/main.js"></script>`
        );
      },
    },
  ],
  server: {
    port: 3000,
    open: true,
  },
});
