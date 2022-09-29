var CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});



self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      'js/vendor/tailwind.3.1.8.js',
      'js/main.js',
      'js/triangles.js',
      'js/perimeters.js',
      'js/kilo-litres.js'
    ]);
  });
}


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}


// Remote Assets Proxy
self.onfetch = function(event) {
  if (event.request.url.contains('aqeproxy')) {
    var init = { method: 'GET',
      mode: event.request.mode,
      cache: 'default' };
    var url = event.request.url.split('aqeproxy/')[1];
    console.log('DEBUG: proxying', url);
    event.respondWith(fetch(url, init));
  } else {
    event.respondWith(fetch(event.request));
  }
};
