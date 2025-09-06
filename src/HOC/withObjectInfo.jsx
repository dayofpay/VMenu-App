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
          const restaurantId = storage.getItem('restaurantId');

          // If the restaurant ID is null, an error is thrown
          if (restaurantId === null) {
            throw new Error('Restaurant ID is null');
          }

          // The object data is fetched from the server using the
          // getObjectData function from the objectServices module.
          const response = await getObjectData(Number(restaurantId));

          // The object data is stored in the objectData state
          setObjectData(response.objectData);
        } catch (error) {
          // If there is an error while fetching the object data, the error
          // is logged to the console and the local storage is cleared.
          console.error('Error while trying to fetch object data:', error);
          localStorage.clear();
        }
      })();
    }, []);

    // If the objectData state is null, an error is thrown
    if (objectData === null) {
      throw new Error('objectData is null');
    }

    // The original component is rendered with the objectData state
    return <Component {...props} objectData={objectData} />;
  };

}


