// Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];

// CODELAB: Precache static resources here.
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('v1').then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
    );
});

self.addEventListener('fetch', (event) => {
  // CODELAB: Add fetch event handler here.
  if (event.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  } else {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
              return caches.open('v1')
                  .then((cache) => {
                    return cache.match('offline.html');
                  });
              })
        );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== 'v1') {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
});
