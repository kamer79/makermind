const CACHE = "makermind-v1.3.0";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png"
];

// Install Service Worker and cache the local app shell
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clear out older cache versions
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch handler optimized for local resources and local AI model loading
self.addEventListener("fetch", e => {
  // Skip cross-origin / external requests if any remain
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) {
        return cached;
      }
      
      return fetch(e.request).then(res => {
        // Do not cache partial content or failed responses (important for large AI .bin files)
        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }

        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    })
  );
});
