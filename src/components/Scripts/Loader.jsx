import React, { useEffect } from 'react';
import { APP_PAGES } from '../../utils/pageData';

const ScriptLoader = ({page}) => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
        try {
          switch(page){
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
              break;
            case APP_PAGES.PRODUCT_DETAILS_PAGE:
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
              break;
          }
          // Additional scripts can be loaded here
        } catch (error) {
          console.error("Failed to load script:", error);
        }
      };

    loadScripts(); // Call the function to load scripts when the component mounts

    // Optional: If you need cleanup logic, you can define it here
    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default ScriptLoader;
