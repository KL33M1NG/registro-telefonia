const CACHE_NAME = 'registro-telefonia-v2';
const urlsToCache = [
    '/',
    'index.html',
    'https://i.ibb.co/qFk65j2s/LOGO-HOSPITAL.png',
    'https://i.ibb.co/CKhvCqbc/LOGO-HC-DIGITAL.png',
    'https://i.ibb.co/hRm3C7xv/DEEM.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});