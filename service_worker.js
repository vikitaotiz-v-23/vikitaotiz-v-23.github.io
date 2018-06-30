//Assets to be cached
const assets = [
  './',
  './css/skeleton.css',
  './css/style.css',
  './js/main.js',
  'https://free.currencyconverterapi.com/api/v5/currencies'
];

//Service Worker Installation Event
self.addEventListener('install', async event => {
  const cache = await caches.open('new-assets');
  cache.addAll(assets);
})

//Service Worker Activation Event
self.addEventListener('activate', event => {
})

//Service Worker Fetching Event
self.addEventListener('fetch', event => {
  const request = event.request;
  const url  = new URL(request.url);

  if (url.origin == location.origin) {
      event.respondWith(cacheFirst(request));
  }	else {
  	event.respondWith(networkFirst(request));
  }

})

//Function cacheFirst strategy
async function cacheFirst(request) {
	const cachedResponse = await caches.match(request);  
	return cachedResponse || fetch(request);
}

async function networkFirst(request ) {
	const cache = await caches.open('rates-dynamic');
	try {
		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	} catch(error) {
	     return await cache.match(request);
	}
}