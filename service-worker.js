// Kill-switch do antigo service worker (PWA/workbox, removido do blog).
// Navegadores que já o instalaram buscam este arquivo na mesma URL: ele apaga
// os caches e se desregistra. Pode ser apagado depois de alguns meses.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys()
			.then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
			.then(() => self.registration.unregister())
	);
});
