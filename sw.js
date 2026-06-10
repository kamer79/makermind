const CACHE   = "makermind-v1.4.0";
const VERSION = "1.4.0";
const ASSETS  = [
  "/makermind/",
  "/makermind/index.html",
  "/makermind/manifest.json",
  "/makermind/icons/icon-192.png",
  "/makermind/icons/icon-512.png"
];

// Install — cache assets, post version to clients
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches, notify clients of new version
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => {
        // Notify all open clients that a new version is active
        self.clients.matchAll({ type: "window" }).then(clients => {
          clients.forEach(client => client.postMessage({
            type: "NEW_VERSION",
            version: VERSION
          }));
        });
      })
  );
});

// Fetch — network first for API/fonts/CDN, cache first for app shell
self.addEventListener("fetch", e => {
  const url = e.request.url;
  if (
    url.includes("anthropic.com") ||
    url.includes("fonts.") ||
    url.includes("cdn.jsdelivr.net") ||
    url.includes("transformers")
  ) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
