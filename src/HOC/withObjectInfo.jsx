// HOC
import { useEffect } from "react";
import { getObjectData } from "../services/objectServices";
import usePersistedState from "../hooks/usePersistedState";
import * as storage from '../utils/memory';

/**
 * This higher-order component takes a React component as an argument and
 * returns a new component that has the objectData state and the getObjectData
 * effect attached to it.
 *
 * The new component is a function component that takes the props of the
 * original component and renders it with the additional objectData state
 * and the getObjectData effect.
 *
 * @param {React.Component} Component The component to be enhanced.
 * @returns {React.Component} The enhanced component.
 */
export default function withObjectData(Component) {
  /**
   * This function takes the props of the original component and renders it
   * with the additional objectData state and the getObjectData effect.
   *
   * @param {Object} props The props of the original component.
   * @returns {React.ReactElement} The rendered React element.
   */
  return function EnhancedComponent(props) {
    /**
     * The objectData state is initialized with an empty object and stored
     * in local storage using the usePersistedState hook.
     */
    const [objectData, setObjectData] = usePersistedState('objectData', {});

    /**
     * The getObjectData effect is called when the component mounts and is
     * used to fetch the object data from the server and store it in the
     * objectData state.
     */
    useEffect(() => {
      (async () => {
        try {
          // The restaurant ID is retrieved from local storage
          const restaurantId = Number(storage.getItem('restaurantId'));

          // If the restaurant ID is null, an error is thrown
          if (!restaurantId) {
            throw new Error('Restaurant ID is null');
          }

          // The object data is fetched from the server using the
          // getObjectData function from the objectServices module.
          const response = await getObjectData(restaurantId);
          if (!response?.objectData) {
            throw new Error('Object data request returned no data');
          }

          // The object data is stored in the objectData state
          setObjectData(response.objectData);
        } catch (error) {
          // Keep the last valid objectData on transient refresh/network errors.
          // Clearing storage here used to reset CUSTOM_STYLES and saved themes.
          console.error('Error while trying to fetch object data:', error);
        }
      })();
    // The persisted setter is intentionally excluded because this legacy hook
    // recreates it on every render and would otherwise refetch indefinitely.
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      const previewMode = new URLSearchParams(window.location.search).get('preview') === '1'
        || sessionStorage.getItem('vmenuPreviewMode') === '1';
      if (!previewMode || window.parent === window) return undefined;

      const allowedOrigins = new Set([
        'https://v-menu.eu',
        'http://localhost:7707',
        'http://127.0.0.1:7707',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ]);

      const handlePreviewUpdate = (event) => {
        if (event.source !== window.parent || !allowedOrigins.has(event.origin)) return;
        if (event.data?.type !== 'VMENU_PREVIEW_UPDATE') return;

        const restaurantId = Number(storage.getItem('restaurantId'));
        if (!restaurantId || Number(event.data.objectId) !== restaurantId) return;

        setObjectData((current) => ({
          ...current,
          MODULES: {
            ...current?.MODULES,
            OBJECT_INFO: {
              ...current?.MODULES?.OBJECT_INFO,
              LANDING_PAGE_SETTINGS: {
                ...current?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS,
                COMPONENT_BUILDER: event.data.componentBuilder,
              },
            },
          },
        }));
      };

      window.addEventListener('message', handlePreviewUpdate);
      return () => window.removeEventListener('message', handlePreviewUpdate);
    }, [setObjectData]);

    // If the objectData state is null, an error is thrown
    if (objectData === null) {
      throw new Error('objectData is null');
    }

    // The original component is rendered with the objectData state
    return <Component {...props} objectData={objectData} />;
  };

}


