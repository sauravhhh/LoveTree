/* LoveTree service worker — bump the cache name on every published change. */
var CACHE = 'lovetree-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './image.png',
  './love.ico',
  './shree.mp3',
  './icon-192.png',
  './icon-512.png',
  './js/default.css',
  './js/functions.js',
  './js/love.js',
  './js/jquery.min.js',
  './js/jscex.min.js',
  './js/jscex-parser.js',
  './js/jscex-jit.js',
  './js/jscex-builderbase.min.js',
  './js/jscex-async.min.js',
  './js/jscex-async-powerpack.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (hit) {
    return hit || fetch(e.request);
  }));
});
