/* Nawafid Marathon app: lets the site install as an app and open without a connection.
   Pages: network first, so a new video or teacher shows up at once; the last copy is used when offline.
   Images, icons and fonts: served from the cache, refreshed in the background.
   Songs, videos, PDFs and every other site (YouTube, the visit counter) are left to the browser. */
const VERSION = "nw-v1";
const SHELL = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png", "/nw_head.webp", "/nw_running.webp"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

const isFont = (u) => u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com";
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  const same = u.origin === self.location.origin;
  if (!same && !isFont(u)) return;

  if (req.mode === "navigate" || (same && (u.pathname === "/" || u.pathname.endsWith(".html")))) {
    e.respondWith(fetch(req).then((r) => {
      if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put("/", copy)); }
      return r;
    }).catch(() => caches.match("/").then((r) => r || caches.match(req))));
    return;
  }
  if (isFont(u) || /\.(webp|png|jpg|jpeg|svg|woff2?)$/i.test(u.pathname)) {
    e.respondWith(caches.open(VERSION).then((c) => c.match(req).then((hit) => {
      const net = fetch(req).then((r) => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
