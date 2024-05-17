import React, { useState, useEffect } from 'react';
import { APP_PAGES } from '../../utils/pageData';

const ScriptLoader = ({ page, objectData }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);


  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

   

    const loadScripts = async () => {
      try {
        switch (page) {
          case APP_PAGES.HOME_PAGE:
            await loadScript("/assets/js/jquery.js");
            await loadScript('/assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
            await loadScript('/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js');
            await loadScript('/assets/vendor/swiper/swiper-bundle.min.js');
            await loadScript('/assets/vendor/nouislider/nouislider.min.js');
            await loadScript('/assets/js/dz.carousel.js');
            await loadScript('/assets/vendor/wnumb/wNumb.js');
            await loadScript('/assets/js/noui-slider.init.js');
            await loadScript('/assets/vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js');
            await loadScript('/assets/js/settings.js');
            await loadScript('/assets/js/custom.js');
            await loadScript('/assets/app.js');
            await loadScript('/assets/index.js');
            break;
          case APP_PAGES.PRODUCT_DETAILS_PAGE:
            await loadScript("/assets/js/jquery.js");
            await loadScript('/assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
            await loadScript('/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js');
            //await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
            await loadScript('/assets/vendor/nouislider/nouislider.min.js');
            await loadScript('/assets/js/dz.carousel.js');
            await loadScript('/assets/vendor/wnumb/wNumb.js');
            await loadScript('/assets/js/noui-slider.init.js');
            await loadScript('/assets/vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js');
            await loadScript('/assets/js/settings.js');
            await loadScript('/assets/js/custom.js');
            break;
          // Add cases for other pages if needed
          default:
            console.error("Invalid page name:", page);
            await loadScript("/assets/js/jquery.js");
            await loadScript('/assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
            await loadScript('/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js');
            await loadScript('/assets/vendor/swiper/swiper-bundle.min.js');
            await loadScript('/assets/vendor/nouislider/nouislider.min.js');
            await loadScript('/assets/js/dz.carousel.js');
            await loadScript('/assets/vendor/wnumb/wNumb.js');
            await loadScript('/assets/js/noui-slider.init.js');
            await loadScript('/assets/vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js');
            await loadScript('/assets/js/settings.js');
            await loadScript('/assets/js/custom.js');
            await loadScript('/assets/app.js');
            await loadScript('/assets/index.js');
            break;
        }
        setScriptsLoaded(true); // Set the state to indicate that scripts are loaded
      } catch (error) {
        console.error("Failed to load script:", error);
      }
    };


    loadScripts();

    return () => {
      // Cleanup logic if needed
    };
  }, [page, objectData]);

  return (
    <>
      {scriptsLoaded ? <PageContent page={page} /> : null} 
    </>
  );
};

const PageContent = ({ page }) => {
  // Return the JSX for the page content based on the page name
};

export default ScriptLoader;
