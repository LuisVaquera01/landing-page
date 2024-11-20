const CACHE_NAME = "v1_cache_PWA";

// Archivos que se almacenarán en la caché
var urlsToCache = [
    './',
    './images/Logo-VaqueraShop 16x16.png',
    './images/Logo-VaqueraShop 32x32.png',
    './images/Logo-VaqueraShop 64x64.png',
    './images/Logo-VaqueraShop96x96.png',
    './images/Logo-VaqueraShop 128x128.png',
    './images/Logo-VaqueraShop 256x256.png',
    './images/Logo-VaqueraShop 384x384.png',
    './images/Logo-VaqueraShop 512x512.png',
    './images/Logo-VaqueraShop 1024x1024.png'
];

//instalacion del service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache
        .addAll(urlsToCache)
        .then(() => {
          self.skipWaiting();
        })
        .catch((err) => {
          console.log("no se ha cargado la cache ", err);
        });
    })
  );
});

// Evento Activate activa el Sw y permite que trabaje offline
self.addEventListener("activate", (e) => {
  //añadimos todos los elementos en la cache
  const cacheWhiteList = [CACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              //borrar los elementos que ya no esten en la cache
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        //Activar cache en el dispositivo
        self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // devuelvo datos desde cache
        return res;
      }
      return fetch(e.request);
    })
  );
});
