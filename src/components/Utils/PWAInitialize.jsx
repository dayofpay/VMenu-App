import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getEnv } from '../../utils/appData';

const PWA_WORKER_URL = '/app.js?v=4';
const PWA_CONFIG_CACHE = 'vmenu-pwa-config-v1';
const PWA_LAUNCH_CONTEXT_KEY = '/__vmenu_pwa_launch_context__';

const readStoredNumber = (key) => {
  try { return Number(JSON.parse(localStorage.getItem(key) || 'null')); } catch { return Number(localStorage.getItem(key)); }
};

const planIsPremium = (objectData) => {
  const plan = objectData?.license?.data?.dataValues || objectData?.license?.data || {};
  const planId = Number(plan.plan_id || objectData?.objectInformation?.object_plan_id);
  const planName = String(plan.plan_name || '').toLowerCase();
  return planId === 4 || planName.includes('premium');
};

const assetUrl = (value, fallback = '') => {
  const source = value || fallback;
  if (!source) return '';
  if (/^https?:\/\//i.test(source)) return source;
  if (source.startsWith('/')) return `${getEnv()}${source}`;
  return `${getEnv()}/uploads/${source}`;
};

const isStandalone = () => window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;

export default function PwaManager({ objectData, pageKey }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(() => isStandalone());
  const [dismissed, setDismissed] = useState(false);
  const objectId = readStoredNumber('restaurantId');
  const tableId = readStoredNumber('tableId');
  const settings = objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS?.PWA_SETUP || {};
  const premium = planIsPremium(objectData);
  const enabled = premium && settings.enabled === true && objectId > 0 && tableId > 0;
  const previewMode = new URLSearchParams(window.location.search).get('preview') === '1'
    || sessionStorage.getItem('vmenuPreviewMode') === '1';
  const dismissKey = `vmenu:pwa-prompt-dismissed:${objectId}`;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  const name = settings.name || objectData?.objectInformation?.object_name || 'V-MENU';
  const icon = useMemo(
    () => assetUrl(settings.iconUrl, objectData?.objectInformation?.object_image),
    [objectData?.objectInformation?.object_image, settings.iconUrl],
  );

  useEffect(() => {
    setDismissed(localStorage.getItem(dismissKey) === '1');
  }, [dismissKey]);

  useEffect(() => {
    let disposed = false;
    let manifest = null;
    const currentOrigin = window.location.origin;
    const rootScope = `${currentOrigin}/`;

    const removeCurrentPwa = async () => {
      document.querySelectorAll('link[data-vmenu-pwa-manifest]').forEach((link) => link.remove());
      if (!('serviceWorker' in navigator)) return;
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations
        .filter((registration) => registration.scope === rootScope)
        .map((registration) => registration.unregister()));
      if ('caches' in window) await caches.delete('vmenu-pwa-config-v1');
    };

    if (!enabled || previewMode) {
      removeCurrentPwa().catch((error) => console.warn('PWA cleanup was not completed:', error));
      setInstallPrompt(null);
      return undefined;
    }

    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      localStorage.removeItem(dismissKey);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const previousTheme = themeMeta?.getAttribute('content');
    if (themeMeta && /^#[0-9a-f]{6}$/i.test(settings.themeColor || '')) themeMeta.setAttribute('content', settings.themeColor);

    const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    const previousAppleTitle = appleTitle?.getAttribute('content');
    if (appleTitle) appleTitle.setAttribute('content', settings.shortName || name);

    const waitForController = (expectedWorker) => new Promise((resolve) => {
      if (navigator.serviceWorker.controller === expectedWorker) return resolve(true);
      const handleControllerChange = () => {
        if (navigator.serviceWorker.controller !== expectedWorker) return;
        window.clearTimeout(timeout);
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
        resolve(true);
      };
      const timeout = window.setTimeout(() => {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
        resolve(false);
      }, 4000);
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    });

    const waitForActiveWorker = async (registration) => {
      await registration.update().catch(() => {});
      const candidate = registration.installing || registration.waiting || registration.active;
      if (!candidate) return null;
      if (candidate.state === 'activated') return candidate;
      await new Promise((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error('Service worker activation timed out.')), 6000);
        const handleState = () => {
          if (candidate.state === 'activated') {
            window.clearTimeout(timeout);
            candidate.removeEventListener('statechange', handleState);
            resolve();
          } else if (candidate.state === 'redundant') {
            window.clearTimeout(timeout);
            candidate.removeEventListener('statechange', handleState);
            reject(new Error('Service worker activation failed.'));
          }
        };
        candidate.addEventListener('statechange', handleState);
      });
      return registration.active || candidate;
    };

    const storeManifest = async (manifestPath, data) => {
      if (!('caches' in window)) throw new Error('Manifest storage is not supported by this browser.');
      const cache = await caches.open(PWA_CONFIG_CACHE);
      const context = { objectId, tableId };
      await Promise.all([
        cache.put(manifestPath, new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/manifest+json; charset=utf-8', 'Cache-Control': 'no-store' },
        })),
        cache.put(PWA_LAUNCH_CONTEXT_KEY, new Response(JSON.stringify(context), {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
        })),
      ]);
    };

    const preparePwa = async () => {
      if (!('serviceWorker' in navigator)) return;
      const response = await fetch(`${getEnv()}/api/manifest/${objectId}/${tableId}`, { mode: 'cors', cache: 'no-store' });
      if (!response.ok) throw new Error('The app manifest is not available.');
      const data = await response.json();
      data.id = `${currentOrigin}/menu/${objectId}`;
      data.start_url = `${currentOrigin}/?source=pwa&pwa_object=${objectId}&pwa_table=${tableId}`;
      data.scope = `${currentOrigin}/`;

      const registration = await navigator.serviceWorker.register(PWA_WORKER_URL, { scope: '/', updateViaCache: 'none' });
      const worker = await waitForActiveWorker(registration);
      if (!worker) throw new Error('The app service worker is not active.');
      const controlled = await waitForController(worker);
      if (!controlled || disposed) return;

      const manifestPath = `/pwa-manifest/${objectId}/${tableId}.webmanifest`;
      await storeManifest(manifestPath, data);
      if (disposed) return;

      manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.dataset.vmenuPwaManifest = 'true';
      manifest.href = manifestPath;
      document.head.appendChild(manifest);
      registration.update().catch(() => {});
    };
    preparePwa().catch((error) => console.warn('App installation could not be prepared:', error));

    return () => {
      disposed = true;
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      manifest?.remove();
      if (themeMeta && previousTheme) themeMeta.setAttribute('content', previousTheme);
      if (appleTitle) appleTitle.setAttribute('content', previousAppleTitle || '');
    };
  }, [dismissKey, enabled, name, objectId, previewMode, settings.shortName, settings.themeColor, tableId]);

  const dismiss = () => {
    localStorage.setItem(dismissKey, '1');
    setDismissed(true);
  };

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice?.outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  const canShow = enabled && pageKey === 'home' && !previewMode && !installed && !dismissed && (installPrompt || isIos);
  if (!canShow) return null;

  return (
    <>
      <style>{`
        .vmenu-pwa-prompt{position:fixed;z-index:1090;left:50%;bottom:88px;transform:translateX(-50%);width:min(620px,calc(100% - 24px));display:flex;align-items:center;gap:14px;padding:15px;border:1px solid var(--vm-theme-border,#e5e7eb);border-radius:18px;background:var(--vm-theme-surface,#fff);color:var(--vm-theme-text,#18231f);box-shadow:0 20px 55px rgba(15,23,42,.22)}
        .vmenu-pwa-prompt__icon{width:54px;height:54px;flex:0 0 auto;border-radius:14px;object-fit:cover;background:#f1f5f9}
        .vmenu-pwa-prompt__copy{min-width:0;flex:1}.vmenu-pwa-prompt__copy strong{display:block;font-size:15px}.vmenu-pwa-prompt__copy span{display:block;margin-top:3px;color:var(--vm-theme-muted,#667085);font-size:12px;line-height:1.4}
        .vmenu-pwa-prompt__actions{display:flex;gap:7px;align-items:center}.vmenu-pwa-prompt button{border:0;border-radius:999px;padding:9px 13px;font-weight:700;white-space:nowrap}.vmenu-pwa-prompt__install{background:var(--vm-theme-primary,#0c8a6a);color:#fff}.vmenu-pwa-prompt__later{background:transparent;color:var(--vm-theme-muted,#667085)}
        @media(max-width:560px){.vmenu-pwa-prompt{align-items:flex-start;flex-wrap:wrap}.vmenu-pwa-prompt__copy{width:calc(100% - 72px)}.vmenu-pwa-prompt__actions{width:100%;justify-content:flex-end}}
      `}</style>
      <aside className="vmenu-pwa-prompt" aria-label="Добавяне на менюто като приложение">
        {icon ? <img className="vmenu-pwa-prompt__icon" src={icon} alt="" /> : <span className="vmenu-pwa-prompt__icon" />}
        <div className="vmenu-pwa-prompt__copy">
          <strong>Добавете {name} като приложение</strong>
          <span>{isIos && !installPrompt ? 'Отворете менюто за споделяне и изберете „Добави към Начален екран“.' : 'Отваряйте менюто директно от началния екран на устройството.'}</span>
        </div>
        <div className="vmenu-pwa-prompt__actions">
          <button type="button" className="vmenu-pwa-prompt__later" onClick={dismiss}>По-късно</button>
          {installPrompt && <button type="button" className="vmenu-pwa-prompt__install" onClick={install}>Добави</button>}
        </div>
      </aside>
    </>
  );
}

PwaManager.propTypes = {
  objectData: PropTypes.object,
  pageKey: PropTypes.string,
};
