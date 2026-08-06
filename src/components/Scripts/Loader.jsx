/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { APP_PAGES } from '../../utils/pageData';

const COMMON_SCRIPTS = [
  '/assets/js/jquery.js',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
  '/assets/vendor/nouislider/nouislider.min.js',
  '/assets/js/dz.carousel.js',
  '/assets/vendor/wnumb/wNumb.js',
  '/assets/js/noui-slider.init.js',
  '/assets/vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
  '/assets/js/settings.js',
  '/assets/js/custom.js',
];

const scriptPromises = new Map();

function loadScriptOnce(src) {
  if (scriptPromises.has(src)) return scriptPromises.get(src);

  const absoluteSrc = new URL(src, window.location.origin).href;
  const existing = [...document.scripts].find((script) => script.src === absoluteSrc);
  if (existing?.dataset.vmenuLoaded === 'true') {
    const ready = Promise.resolve();
    scriptPromises.set(src, ready);
    return ready;
  }

  const promise = new Promise((resolve, reject) => {
    const script = existing || document.createElement('script');
    const onLoad = () => {
      script.dataset.vmenuLoaded = 'true';
      resolve();
    };
    const onError = () => {
      scriptPromises.delete(src);
      reject(new Error('Failed to load ' + src));
    };

    script.addEventListener('load', onLoad, { once: true });
    script.addEventListener('error', onError, { once: true });
    if (!existing) {
      script.src = src;
      script.async = false;
      script.dataset.vmenuManagedScript = 'true';
      document.body.appendChild(script);
    }
  });

  scriptPromises.set(src, promise);
  return promise;
}

function scriptsForPage(page) {
  const extras = page === APP_PAGES.PRODUCT_DETAILS_PAGE
    ? []
    : ['/assets/vendor/swiper/swiper-bundle.min.js', '/assets/index.js'];
  return [...COMMON_SCRIPTS.slice(0, 3), ...extras.slice(0, 1), ...COMMON_SCRIPTS.slice(3), ...extras.slice(1)];
}

const ScriptLoader = ({ page }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    setScriptsLoaded(false);

    (async () => {
      try {
        for (const src of scriptsForPage(page)) await loadScriptOnce(src);
        if (active) setScriptsLoaded(true);
      } catch (error) {
        console.error('Failed to load legacy V-MENU scripts:', error);
      }
    })();

    return () => { active = false; };
  }, [page]);

  return scriptsLoaded ? <span hidden data-vmenu-legacy-scripts-ready="true" /> : null;
};

export default ScriptLoader;
