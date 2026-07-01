const CACHE_NAME = 'target-study-v9';
const ASSETS = ['./','./index.html?v=9','./app.js?v=9','./data.js?v=9','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { event.respondWith(fetch(event.request).then(res => { const copy=res.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{}); return res; }).catch(() => caches.match(event.request))); });
