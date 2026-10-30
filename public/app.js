const SHELL_CACHE = 'vmenu-shell-v3';
const OFFLINE_SHELL_KEY = '/__vmenu_offline_shell__';
const PWA_CONFIG_CACHE = 'vmenu-pwa-config-v1';
const PWA_LAUNCH_CONTEXT_KEY = '/__vmenu_pwa_launch_context__';
const PWA_WORKER_VERSION = '4';

const readContextFromManifestPath = (manifestPath) => {
	const match = String(manifestPath || '').match(/^\/pwa-manifest\/(\d+)\/(\d+)\.webmanifest$/);
	if (!match) return null;
	return { objectId: Number(match[1]), tableId: Number(match[2]) };
};

const findStoredPwaContext = async (cache) => {
	const storedResponse = await cache.match(PWA_LAUNCH_CONTEXT_KEY);
	if (storedResponse) {
		try {
			const storedContext = await storedResponse.json();
			if (Number(storedContext.objectId) > 0 && Number(storedContext.tableId) > 0) return storedContext;
		} catch {
			// Fall back to a cached manifest created before launch-context storage was added.
		}
	}

	const cachedRequests = await cache.keys();
	for (const request of cachedRequests.reverse()) {
		const context = readContextFromManifestPath(new URL(request.url).pathname);
		if (context) return context;
	}
	return null;
};

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

self.addEventListener('message', (event) => {
	const reply = (payload) => event.ports?.[0]?.postMessage(payload);
	if (event.data?.type === 'VMENU_PWA_READY') {
		reply({ ok: true, version: PWA_WORKER_VERSION });
		return;
	}

	if (event.data?.type === 'VMENU_GET_PWA_CONTEXT') {
		event.waitUntil((async () => {
			try {
				const cache = await caches.open(PWA_CONFIG_CACHE);
				const context = await findStoredPwaContext(cache);
				reply(context ? { ok: true, context } : { ok: false, error: 'PWA context is not available.' });
			} catch (error) {
				reply({ ok: false, error: error.message });
			}
		})());
		return;
	}

	if (event.data?.type !== 'VMENU_STORE_PWA_MANIFEST') return;
	const manifestPath = String(event.data.manifestPath || '');
	const manifest = event.data.manifest;

	event.waitUntil((async () => {
		try {
			const context = readContextFromManifestPath(manifestPath);
			if (!context || !manifest || typeof manifest !== 'object') {
				throw new Error('Invalid manifest configuration.');
			}
			if (new URL(manifest.start_url).origin !== self.location.origin) throw new Error('Invalid manifest origin.');
			const cache = await caches.open(PWA_CONFIG_CACHE);
			await Promise.all([
				cache.put(manifestPath, new Response(JSON.stringify(manifest), {
					status: 200,
					headers: { 'Content-Type': 'application/manifest+json; charset=utf-8', 'Cache-Control': 'no-store' },
				})),
				cache.put(PWA_LAUNCH_CONTEXT_KEY, new Response(JSON.stringify(context), {
					status: 200,
					headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
				})),
			]);
			reply({ ok: true });
		} catch (error) {
			reply({ ok: false, error: error.message });
		}
	})());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	const requestUrl = new URL(event.request.url);
	if (requestUrl.origin !== self.location.origin) return;
	if (/^\/pwa-manifest\/\d+\/\d+\.webmanifest$/.test(requestUrl.pathname)) {
		event.respondWith(caches.open(PWA_CONFIG_CACHE)
			.then((cache) => cache.match(requestUrl.pathname))
			.then((response) => response || new Response('{}', {
				status: 404,
				headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
			})));
		return;
	}
	if (event.request.mode !== 'navigate') return;

	event.respondWith(
		fetch(event.request)
			.then(async (response) => {
				if (response.ok) {
					const copy = response.clone();
					const cache = await caches.open(SHELL_CACHE);
					await Promise.all([
						cache.put(event.request, copy.clone()),
						cache.put(OFFLINE_SHELL_KEY, copy),
					]);
				}
				return response;
			})
			.catch(async () => {
				const cachedShell = await caches.match(event.request) || await caches.match(OFFLINE_SHELL_KEY);
				return cachedShell || new Response('V-MENU is temporarily unavailable.', {
					status: 503,
					headers: { 'Content-Type': 'text/plain; charset=utf-8' },
				});
			})
	);
});
