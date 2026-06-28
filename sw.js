const CACHE_NAME = "target-study-v8-lesson-ui";
const ASSETS = ["./?v=8","./index.html?v=8","./data.js?v=8","./app.js?v=8","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install", event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", event => { event.respondWith(fetch(event.request).then(res => { const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{}); return res; }).catch(() => caches.match(event.request))); });
