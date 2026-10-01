const CACHE = 'vitapass-visor-0bb0e8262e';
const PAGINA = '/vitapass/v/';
const FICHEROS = [PAGINA, '/vitapass/visor.0bb0e8262e.js', '/vitapass/estilos.ee91f1a9c7.css'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHEROS)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname === PAGINA || url.pathname === PAGINA.slice(0, -1)) {
    e.respondWith(fetch(e.request).then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(PAGINA, copia)); return r; }).catch(() => caches.match(PAGINA)));
    return;
  }
  if (FICHEROS.includes(url.pathname)) e.respondWith(caches.match(e.request).then((g) => g || fetch(e.request)));
});
