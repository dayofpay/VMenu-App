/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getObjectData } from '../../services/objectServices';
import { getEnv } from '../../utils/appData';
import CustomComponents from '../PageComponents/Home/CustomComponents';
import { createVMenuDevApi } from './vmenuDevApi';
import PluginComponentSlot from './PluginComponents';
import ConsentManager from './ConsentManager';
import { consentAllows, normalizeConsentRequirements, readConsent } from './consentStorage';
import './experience.css';

const PAGE_MATCHERS = [
  [/^\/$/, 'home'],
  [/^\/categories\/?$/, 'categories'],
  [/^\/category\//, 'category'],
  [/^\/products\//, 'product'],
  [/^\/cart\/?$/, 'cart'],
  [/^\/announces\/?$/, 'announcements'],
  [/^\/announces\//, 'announcement'],
  [/^\/checkout/, 'checkout'],
  [/^\/profile\/?$/, 'profile'],
  [/^\/review\/?$/, 'review'],
];

const FONT_STACKS = {
  Inter: "'Inter', 'Segoe UI', sans-serif",
  Poppins: "'Poppins', 'Segoe UI', sans-serif",
  Lato: "'Lato', 'Segoe UI', sans-serif",
  Roboto: "'Roboto', 'Segoe UI', sans-serif",
  Montserrat: "'Montserrat', 'Segoe UI', sans-serif",
  'Playfair Display': "'Playfair Display', Georgia, serif",
  System: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const GOOGLE_FONTS = new Set(['Inter', 'Roboto', 'Montserrat', 'Playfair Display']);

const assetUrl = (value) => {
  const url = String(value || '').trim();
  if (url.startsWith('/uploads/')) return `${getEnv()}${url}`;
  return /^https?:\/\//i.test(url) ? url : '';
};

function getPageKey(pathname) {
  return PAGE_MATCHERS.find(([pattern]) => pattern.test(pathname))?.[1] || 'all';
}

function storedObjectId() {
  try {
    const id = Number(JSON.parse(localStorage.getItem('restaurantId') || 'null'));
    return Number.isInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

function collectConsentRequirements(settings, plugins, objectData, pageKey) {
  const required = [];
  const injection = settings?.SCRIPT_INJECTION;
  if (injection?.enabled && Array.isArray(injection.scripts)) {
    injection.scripts.forEach((script) => {
      const matchesPage = script?.pages?.includes('all') || script?.pages?.includes(pageKey);
      if (script?.enabled && matchesPage && ['analytics', 'marketing'].includes(script.consent)) required.push(script.consent);
    });
  }
  const workspace = settings?.DEVELOPER_SCRIPTS;
  if (hasDeveloperPlan(objectData) && workspace?.enabled && Array.isArray(workspace.files)) {
    workspace.files.forEach((file) => {
      const matchesPage = file?.target === 'all' || file?.target === pageKey;
      if (file?.enabled && matchesPage && ['analytics', 'marketing'].includes(file.consent)) required.push(file.consent);
    });
  }
  (Array.isArray(plugins) ? plugins : []).forEach((plugin) => {
    if (Array.isArray(plugin?.consent)) required.push(...plugin.consent);
  });
  return normalizeConsentRequirements(required);
}

function hasDeveloperPlan(objectData) {
  const plan = objectData?.license?.data;
  const planName = String(
    plan?.plan_name
    || plan?.displayName
    || objectData?.objectInformation?.plan_name
    || '',
  ).trim().toLowerCase();

  if (planName.includes('gold') || planName.includes('premium')) return true;

  const planId = Number(plan?.canonicalPlanId || plan?.plan_id || objectData?.objectInformation?.object_plan_id);
  return [3, 4].includes(planId);
}

function ScriptRuntime({ settings, pageKey, previewMode, objectId, consent }) {
  useEffect(() => {
    if (previewMode || !settings?.enabled || !Array.isArray(settings.scripts)) return undefined;
    const added = [];
    settings.scripts.forEach((item) => {
      if (!item?.enabled || !/^https:\/\//i.test(item.src || '')) return;
      if (!(item.pages?.includes('all') || item.pages?.includes(pageKey))) return;
      if (!consentAllows(item.consent || 'necessary', objectId, consent)) return;
      const alreadyLoaded = [...document.querySelectorAll('script[data-vmenu-script]')]
        .some((script) => script.dataset.vmenuScript === item.id);
      if (alreadyLoaded) return;

      const script = document.createElement('script');
      script.src = item.src;
      script.dataset.vmenuScript = item.id;
      if (item.strategy === 'module') script.type = 'module';
      else if (item.strategy === 'async') script.async = true;
      else script.defer = true;
      (item.placement === 'head' ? document.head : document.body).appendChild(script);
      added.push(script);
    });
    return () => added.forEach((script) => script.remove());
  }, [consent, objectId, pageKey, previewMode, settings]);
  return null;
}

function BrandSignature({ branding, pageKey }) {
  if (!branding?.enabled || pageKey === 'home') return null;
  const logo = assetUrl(branding.logoUrl);
  return <div className="vmenu-brand-signature">
    {logo && <img src={logo} alt={branding.logoAlt || branding.brandName || 'Brand logo'} />}
    <div><strong>{branding.brandName}</strong>{branding.tagline && <span>{branding.tagline}</span>}</div>
  </div>;
}

function DeveloperScriptRuntime({ workspace, objectData, pageKey, theme, branding, objectId, consent, consentRequirements }) {
  useEffect(() => {
    if (!hasDeveloperPlan(objectData)) return undefined;
    const root = document.querySelector('.vmenu-experience');
    if (!root) return undefined;
    const runtime = createVMenuDevApi({ objectData, pageKey, theme, branding, root, consentRequirements, consentSnapshot: consent });
    window.VMenuDev = runtime.api;
    const scriptCleanups = [];
    let disposed = false;
    const safeMode = new URLSearchParams(window.location.search).get('safe_mode') === '1';

    if (!safeMode && workspace?.enabled && Array.isArray(workspace.files)) {
      workspace.files
        .filter((file) => file?.enabled && file.code && (file.target === 'all' || file.target === pageKey))
        .filter((file) => consentAllows(file.consent || 'necessary', objectId, consent))
        .forEach((file) => {
          try {
            console.info('[V-MENU Script] Running ' + (file.name || file.id) + ' on ' + pageKey);
            // Trusted object-admin code. It executes only after explicit workspace + file enablement.
            const execute = new Function('VMenu', `"use strict"; return (async () => {\n${file.code}\n})();\n//# sourceURL=vmenu-dev/${file.name || file.id}`);
            Promise.resolve(execute(runtime.api)).then((cleanup) => {
              if (typeof cleanup !== 'function') return;
              if (disposed) cleanup(); else scriptCleanups.push(cleanup);
            }).catch((error) => {
              console.error(`[V-MENU Script: ${file.name}]`, error);
              runtime.api.events.emit('script:error', { file: file.name, message: error.message });
            });
          } catch (error) {
            console.error(`[V-MENU Script: ${file.name}]`, error);
            runtime.api.events.emit('script:error', { file: file.name, message: error.message });
          }
        });
    }

    return () => {
      disposed = true;
      scriptCleanups.splice(0).reverse().forEach((cleanup) => { try { cleanup(); } catch { /* custom cleanup is best effort */ } });
      runtime.destroy();
      if (window.VMenuDev === runtime.api) delete window.VMenuDev;
    };
  }, [branding, consent, consentRequirements, objectData, objectId, pageKey, theme, workspace]);
  return null;
}

function PluginRuntime({ plugins, objectData, pageKey, theme, branding, objectId, consent, consentRequirements }) {
  useEffect(() => {
    if (!Array.isArray(plugins) || !plugins.length) return undefined;
    if (new URLSearchParams(window.location.search).get('safe_mode') === '1') return undefined;
    const root = document.querySelector('.vmenu-experience');
    if (!root) return undefined;
    const runtime = createVMenuDevApi({ objectData, pageKey, theme, branding, root, consentRequirements, consentSnapshot: consent });
    const styles = [];
    const cleanups = [];
    let disposed = false;

    plugins.forEach((plugin) => {
      const identity = `${plugin.slug || plugin.id}@${plugin.version || 'latest'}`;
      const pluginConsent = normalizeConsentRequirements(plugin.consent);
      if (pluginConsent.some((category) => !consentAllows(category, objectId, consent))) return;
      if (plugin.style) {
        const style = document.createElement('style');
        style.dataset.vmenuPlugin = identity;
        style.textContent = String(plugin.style);
        document.head.appendChild(style);
        styles.push(style);
      }
      if (!plugin.script) return;
      try {
        // Only staff-approved plugin versions are returned by the V-MENU API.
        const execute = new Function('VMenu', 'settings', `"use strict"; return (async () => {\n${plugin.script}\n})();\n//# sourceURL=vmenu-plugin/${identity}/plugin.js`);
        Promise.resolve(execute(runtime.api, plugin.settings || {})).then((cleanup) => {
          if (typeof cleanup !== 'function') return;
          if (disposed) cleanup(); else cleanups.push(cleanup);
        }).catch((error) => console.error(`[V-MENU Plugin: ${identity}]`, error));
      } catch (error) {
        console.error(`[V-MENU Plugin: ${identity}]`, error);
      }
    });

    return () => {
      disposed = true;
      styles.forEach((style) => style.remove());
      cleanups.splice(0).reverse().forEach((cleanup) => { try { cleanup(); } catch { /* best effort */ } });
      runtime.destroy();
    };
  }, [branding, consent, consentRequirements, objectData, objectId, pageKey, plugins, theme]);
  return null;
}

export default function ExperienceLayout() {
  const location = useLocation();
  const pageKey = getPageKey(location.pathname);
  const objectId = storedObjectId();
  const [objectData, setObjectData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('objectData') || '{}'); } catch { return {}; }
  });
  const [consent, setConsent] = useState(() => readConsent(objectId));
  const previewMode = new URLSearchParams(location.search).get('preview') === '1'
    || sessionStorage.getItem('vmenuPreviewMode') === '1';

  useEffect(() => {
    if (!objectId) return;
    getObjectData(objectId).then((response) => {
      if (!response?.objectData) return;
      setObjectData(response.objectData);
      localStorage.setItem('objectData', JSON.stringify(response.objectData));
    }).catch((error) => console.error('Experience settings could not be loaded:', error));
  }, [objectId]);

  useEffect(() => {
    if (!previewMode || window.parent === window) return undefined;
    const allowed = new Set(['https://v-menu.eu', 'http://localhost:7707', 'http://127.0.0.1:7707', 'http://localhost:3000', 'http://127.0.0.1:3000']);
    const onMessage = (event) => {
      if (event.source !== window.parent || !allowed.has(event.origin)) return;
      if (!['VMENU_PREVIEW_UPDATE', 'VMENU_EXPERIENCE_PREVIEW_UPDATE'].includes(event.data?.type)) return;
      const objectId = Number(JSON.parse(localStorage.getItem('restaurantId') || 'null'));
      if (Number(event.data.objectId) !== objectId) return;
      setObjectData((current) => {
        const currentSettings = current?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS || {};
        return {
          ...current,
          MODULES: { ...current?.MODULES, OBJECT_INFO: { ...current?.MODULES?.OBJECT_INFO, LANDING_PAGE_SETTINGS: {
            ...currentSettings,
            ...(event.data.componentBuilder ? { COMPONENT_BUILDER: event.data.componentBuilder } : {}),
            ...(event.data.themeBuilder ? { THEME_BUILDER: event.data.themeBuilder } : {}),
            ...(event.data.brandingSetup ? { BRANDING_SETUP: event.data.brandingSetup } : {}),
            ...(event.data.consentSetup ? { CONSENT_SETUP: event.data.consentSetup } : {}),
            ...(event.data.scriptInjection ? { SCRIPT_INJECTION: event.data.scriptInjection } : {}),
          } } },
        };
      });
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [previewMode]);

  const settings = objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS || {};
  const theme = settings.THEME_BUILDER || {};
  const branding = settings.BRANDING_SETUP || {};
  const consentSetup = settings.CONSENT_SETUP || {};
  const consentRequirements = useMemo(
    () => collectConsentRequirements(settings, objectData?.installedPlugins, objectData, pageKey),
    [objectData, pageKey, settings],
  );
  const customCss = typeof settings.CUSTOM_STYLES?.CSS === 'string' ? settings.CUSTOM_STYLES.CSS : '';
  const colors = theme.colors || {};
  const style = {
    '--vm-theme-primary': colors.primary || '#0c8a6a',
    '--vm-theme-secondary': colors.secondary || '#2563eb',
    '--vm-theme-accent': colors.accent || '#f59e0b',
    '--vm-theme-background': colors.background || '#f6f7f5',
    '--vm-theme-surface': colors.surface || '#ffffff',
    '--vm-theme-text': colors.text || '#18231f',
    '--vm-theme-muted': colors.muted || '#667085',
    '--vm-theme-border': colors.border || '#e5e7eb',
    '--vm-theme-success': colors.success || '#059669',
    '--vm-theme-warning': colors.warning || '#d97706',
    '--vm-theme-danger': colors.danger || '#dc2626',
    '--vm-theme-font': FONT_STACKS[theme.typography?.bodyFont] || FONT_STACKS.Inter,
    '--vm-theme-heading-font': FONT_STACKS[theme.typography?.headingFont] || FONT_STACKS.Inter,
    '--vm-theme-base-size': `${theme.typography?.baseSize || 16}px`,
    '--vm-brand-hero-image': branding.heroImageUrl ? `url("${assetUrl(branding.heroImageUrl)}")` : 'none',
  };

  useEffect(() => {
    const favicon = branding.enabled ? assetUrl(branding.faviconUrl) : '';
    const link = document.getElementById('objectLogo');
    if (!favicon || !link) return undefined;
    const previousHref = link.href;
    link.href = favicon;
    return () => { link.href = previousHref; };
  }, [branding.enabled, branding.faviconUrl]);

  useEffect(() => {
    if (theme.enabled === false) return undefined;
    const requested = [theme.typography?.bodyFont, theme.typography?.headingFont]
      .filter((font, index, fonts) => GOOGLE_FONTS.has(font) && fonts.indexOf(font) === index);
    if (!requested.length) return undefined;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.dataset.vmenuThemeFonts = 'true';
    link.href = `https://fonts.googleapis.com/css2?${requested.map((font) => `family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800`).join('&')}&display=swap`;
    document.head.appendChild(link);
    return () => link.remove();
  }, [theme.enabled, theme.typography?.bodyFont, theme.typography?.headingFont]);

  const themeClasses = [
    'vmenu-experience', theme.enabled === false ? 'theme-disabled' : 'theme-enabled',
    `scale-${theme.typography?.scale || 'balanced'}`,
    `radius-${theme.shape?.radius || 'rounded'}`, `buttons-${theme.shape?.buttonStyle || 'pill'}`,
    `density-${theme.layout?.density || 'comfortable'}`, `width-${theme.layout?.contentWidth || 'wide'}`,
    `shadows-${theme.effects?.shadows || 'soft'}`, theme.effects?.animations === false ? 'animations-off' : '',
    branding.enabled ? `brand-${branding.voice || 'modern'}` : '',
  ].filter(Boolean).join(' ');

  return <div className={themeClasses} style={style} data-page={pageKey}>
    {customCss && <style id="custom-landing-page-css" data-vmenu-object-style="true">{customCss}</style>}
    <ScriptRuntime settings={settings.SCRIPT_INJECTION} pageKey={pageKey} previewMode={previewMode} objectId={objectId} consent={consent} />
    <DeveloperScriptRuntime workspace={settings.DEVELOPER_SCRIPTS} objectData={objectData} pageKey={pageKey} theme={theme} branding={branding} objectId={objectId} consent={consent} consentRequirements={consentRequirements} />
    <PluginRuntime plugins={objectData?.installedPlugins} objectData={objectData} pageKey={pageKey} theme={theme} branding={branding} objectId={objectId} consent={consent} consentRequirements={consentRequirements} />
    <PluginComponentSlot plugins={objectData?.installedPlugins} pageKey={pageKey} slot="page-start" />
    <div data-vmenu-dev-slot="page-start" />
    <BrandSignature branding={branding} pageKey={pageKey} />
    <PluginComponentSlot plugins={objectData?.installedPlugins} pageKey={pageKey} slot="before-content" />
    <div data-vmenu-dev-slot="before-content" />
    <PluginComponentSlot plugins={objectData?.installedPlugins} pageKey={pageKey} slot="before-menu" />
    <CustomComponents objectData={objectData} placement="before-menu" pageKey={pageKey} />
    <Outlet />
    <CustomComponents objectData={objectData} placement="after-menu" pageKey={pageKey} />
    <PluginComponentSlot plugins={objectData?.installedPlugins} pageKey={pageKey} slot="after-menu" />
    <div data-vmenu-dev-slot="after-content" />
    <PluginComponentSlot plugins={objectData?.installedPlugins} pageKey={pageKey} slot="after-content" />
    <ConsentManager objectId={objectId} requirements={consentRequirements} consent={consent} setup={consentSetup} branding={branding} onChange={setConsent} />
  </div>;
}
