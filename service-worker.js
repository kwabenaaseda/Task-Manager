const CACHE_NAME = 'stacktasks-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/pages/RegisterLog/login.html',
  '/pages/RegisterLog/signup.html',
  '/styles/homepage.css',
  '/js/homepage.js',
  '/image/BookmarkBook.png',
  '/image/Binocularsbino.png',
  '/image/Supporthelp.png',
  '/image/github-removebg-preview.png',
  '/image/PlusAdd.png',
  '/pages/user/homepage.html',
  '/pages/user/previous.html',
  '/pages/user/schedule.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
