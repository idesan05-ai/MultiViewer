const CACHE_NAME = 'streamhub-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  // TailwindとLucideはCDNから取得するためキャッシュは必須ではありませんが、
  // 完全なオフライン対応を目指す場合はCDNのURLを追加することも可能です。
  // 今回は最低限起動に必要なファイルのみ指定します。
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返し、なければネットワークから取得
        return response || fetch(event.request);
      })
  );
});