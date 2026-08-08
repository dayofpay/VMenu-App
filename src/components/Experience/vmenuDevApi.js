import { getEnv } from '../../utils/appData';
import { consentAllows, normalizeConsentRequirements, readConsent } from './consentStorage';

const clone = (value) => {
  try { return structuredClone(value); } catch { return JSON.parse(JSON.stringify(value ?? null)); }
};

const safeStorageKey = (objectId, key) => `vmenu_dev_${objectId}_${String(key || '').replace(/[^a-zA-Z0-9_.-]/g, '').slice(0, 80)}`;

export function emitVMenuEvent(name, detail = {}) {
  window.dispatchEvent(new CustomEvent(`vmenu:${String(name || '').slice(0, 100)}`, { detail: clone(detail) }));
}

export function createVMenuDevApi({ objectData, pageKey, theme, branding, root, consentRequirements = [], consentSnapshot }) {
  const objectId = Number(JSON.parse(localStorage.getItem('restaurantId') || 'null')) || null;
  const cleanups = [];

  const events = {
    on(name, handler) {
      if (typeof handler !== 'function') throw new TypeError('Event handler must be a function.');
      const eventName = `vmenu:${String(name || '').slice(0, 100)}`;
      window.addEventListener(eventName, handler);
      const unsubscribe = () => window.removeEventListener(eventName, handler);
      cleanups.push(unsubscribe);
      return unsubscribe;
    },
    emit(name, detail = {}) {
      emitVMenuEvent(name, detail);
    },
  };

  const api = Object.freeze({
    version: '1.0',
    context: () => Object.freeze({ objectId, page: pageKey, pathname: window.location.pathname, locale: document.documentElement.lang || 'bg' }),
    data: Object.freeze({
      getObject: () => clone(objectData),
      async request(path) {
        const safePath = String(path || '');
        if (!safePath.startsWith('/api/')) throw new Error('VMenu.data.request supports read-only /api/ paths.');
        const response = await fetch(`${getEnv()}${safePath}`, { method: 'GET', headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`V-MENU API request failed (${response.status}).`);
        return response.json();
      },
    }),
    theme: Object.freeze({
      get: (name) => getComputedStyle(root).getPropertyValue(String(name || '')).trim(),
      set(name, value) {
        const property = String(name || '');
        if (!property.startsWith('--vm-')) throw new Error('Only --vm-* theme variables can be changed.');
        const previousValue = root.style.getPropertyValue(property);
        const previousPriority = root.style.getPropertyPriority(property);
        root.style.setProperty(property, String(value || '').slice(0, 300));
        cleanups.push(() => {
          if (previousValue) root.style.setProperty(property, previousValue, previousPriority);
          else root.style.removeProperty(property);
        });
      },
      settings: () => clone(theme),
    }),
    branding: Object.freeze({ get: () => clone(branding) }),
    consent: Object.freeze({
      get: () => clone(consentSnapshot || readConsent(objectId)),
      allows: (category) => consentAllows(String(category || ''), objectId, consentSnapshot),
      required: () => normalizeConsentRequirements(consentRequirements),
    }),
    events: Object.freeze(events),
    storage: Object.freeze({
      get(key, fallback = null) {
        try { return JSON.parse(localStorage.getItem(safeStorageKey(objectId, key)) || 'null') ?? fallback; } catch { return fallback; }
      },
      set(key, value) { localStorage.setItem(safeStorageKey(objectId, key), JSON.stringify(value)); },
      remove(key) { localStorage.removeItem(safeStorageKey(objectId, key)); },
    }),
    navigation: Object.freeze({
      go(path) {
        const destination = String(path || '');
        if (!destination.startsWith('/') || destination.startsWith('//')) throw new Error('Navigation accepts only internal paths.');
        window.location.assign(destination);
      },
    }),
    slots: Object.freeze({
      get(name) { return root.querySelector(`[data-vmenu-dev-slot="${String(name || '').replace(/[^a-zA-Z0-9_-]/g, '')}"]`); },
      list() {
        return [...root.querySelectorAll('[data-vmenu-dev-slot]')]
          .map((slot) => slot.dataset.vmenuDevSlot)
          .filter(Boolean);
      },
    }),
    ui: Object.freeze({
      toast(message, options = {}) {
        const toast = document.createElement('div');
        toast.className = `vmenu-dev-toast tone-${['info', 'success', 'warning', 'danger'].includes(options.tone) ? options.tone : 'info'}`;
        toast.textContent = String(message || '').slice(0, 500);
        document.body.appendChild(toast);
        const timer = window.setTimeout(() => toast.remove(), Math.min(10000, Math.max(1200, Number(options.duration) || 3200)));
        const remove = () => { window.clearTimeout(timer); toast.remove(); };
        cleanups.push(remove);
        return remove;
      },
      mountText(slotName, text, options = {}) {
        const slot = api.slots.get(slotName);
        if (!slot) throw new Error(`Unknown V-MENU slot: ${slotName}`);
        const element = document.createElement(options.tag === 'p' ? 'p' : 'div');
        element.className = `vmenu-dev-block ${String(options.className || '').replace(/[^a-zA-Z0-9 _-]/g, '').slice(0, 120)}`;
        element.textContent = String(text || '').slice(0, 5000);
        slot.appendChild(element);
        const remove = () => element.remove();
        cleanups.push(remove);
        return remove;
      },
    }),
  });

  return {
    api,
    destroy() { cleanups.splice(0).reverse().forEach((cleanup) => { try { cleanup(); } catch { /* best-effort script cleanup */ } }); },
  };
}
