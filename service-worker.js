const CACHE_NAME = 'stacktasks-cache-v7'; // <- bump version when updating
const urlsToCache = [
  '/',
  '/index.html',
  '/pages/RegisterLog/login.html',
  '/pages/RegisterLog/signup.html',
  '/styles/homepage.css',
  '/styles/index.css',
  '/styles/stylelogin-signup.css',
  '/js/homepage.js',
  '/image/BookmarkBook.png',
  '/image/Binocularsbino.png',
  '/image/Supporthelp.png',
  '/image/github-removebg-preview.png',
  '/image/PlusAdd.png',
  '/image/black.png',
  '/image/green.png',
  '/image/yellow.png',
  '/image/red.png',
  '/image/Facebook-Newfacebook.png',
  '/image/google_bg_-removebg-preview.png',
  '/image/emaillogo.png',
  '/image/whatsapp logo.png',
  '/pages/user/homepage.html',
  '/pages/user/previous.html',
  '/pages/user/schedule.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // force waiting SW to activate immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  return self.clients.claim(); // take control of clients
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
