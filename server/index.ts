import assets from '../.sites-runtime/assets.json';
import { handleApi } from './api';
const files = assets as Record<string, { body: string; type: string }>;
export default { async fetch(request: Request) {
  const path = new URL(request.url).pathname;
  if (path.startsWith('/api/')) return handleApi(request);
  const asset = files[path] || (!path.includes('.') ? files['/index.html'] : null);
  if (!asset) return new Response('Não encontrado', { status: 404 });
  return new Response(Uint8Array.from(atob(asset.body), (c) => c.charCodeAt(0)), { headers: { 'Content-Type': asset.type, 'Cache-Control': path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' } });
} };
