importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "resume-builder-cache-v1";
const offlineFallbackPage = "/offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
        "/",
        "/editor",
        "/manifest.json",
        "/192.png",
        "/512.png",
        offlineFallbackPage,
      ]);
    })
  );
});

// ✅ Add activate event here
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        return cache.match(event.request) || cache.match(offlineFallbackPage);
      }
    })());
  }
});
