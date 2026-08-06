const SHELL_CACHE = 'vmenu-shell-v2';

self.addEventListener('install', (event) => {
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys()
			.then((keys) => Promise.all(keys
				.filter((key) => key === 'app-store' || (key.startsWith('vmenu-shell-') && key !== SHELL_CACHE))
				.map((key) => caches.delete(key))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || event.request.mode !== 'navigate') return;

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				if (response.ok) {
					const copy = response.clone();
					caches.open(SHELL_CACHE).then((cache) => cache.put('/', copy));
				}
				return response;
			})
			.catch(async () => {
				const cachedShell = await caches.match('/');
				return cachedShell || new Response('V-MENU is temporarily unavailable.', {
					status: 503,
					headers: { 'Content-Type': 'text/plain; charset=utf-8' },
				});
			})
	);
});
