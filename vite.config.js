import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // load all keys, not just VITE_

  return {
    server: {
      port: 5173,
      open: '/index.html'
    },
    // Expose ACTION/METHOD to the client for backward compatibility
    define: {
      'import.meta.env.ACTION': JSON.stringify(env.ACTION),
      'import.meta.env.METHOD': JSON.stringify(env.METHOD)
    },
    plugins: [
      {
        name: 'dev-mock-api',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && req.url === '/api/newsletter') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
              return;
            }
            if (req.method === 'POST' && req.url === '/api/contact') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
              return;
            }
            // SPA routing - tüm sayfaları index.html'e yönlendir
            if (req.method === 'GET' && !req.url.startsWith('/api') && !req.url.startsWith('/node_modules') && !req.url.includes('.')) {
              req.url = '/index.html';
            }
            next();
          });
        }
      }
    ]
  };
});
