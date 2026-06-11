const CACHE   = "makermind-v2.0.0-alpha1";
const VERSION = "2.0.0-alpha1";
const ASSETS  = [
  "/makermind/",
  "/makermind/index.html",
  "/makermind/manifest.json",
  "/makermind/ticker.json",
  "/makermind/icons/icon-192.png",
  "/makermind/icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => {
        self.clients.matchAll({type:"window"}).then(clients =>
          clients.forEach(c => c.postMessage({type:"NEW_VERSION", version:VERSION}))
        );
      })
  );
});

self.addEventListener("fetch", e => {
  const url = e.request.url;
  if(url.includes("anthropic.com")||url.includes("groq.com")||url.includes("googleapis.com")||url.includes("pollinations.ai")||url.includes("fonts.")){
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
