const CACHE = 'vitapass-visor-c0270f281c';
const PAGINA = '/vitapass/v/';
const FICHEROS = [PAGINA, '/vitapass/visor.c0270f281c.js', '/vitapass/estilos.46336ba735.css'];
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
