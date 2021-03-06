const CACHE_NAME = 'nudge app';
const toCache = [
    '/',
    '/index.html',
    '/app.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(toCache))
            .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.open(CACHE_NAME)
                .then((cache) => cache.match(event.request)))
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', key)
                        return caches.delete(key)
                    }
                }))
            })
            .then(() => self.clients.claim())
    )
})