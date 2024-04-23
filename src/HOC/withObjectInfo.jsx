// HOC
import { useState, useEffect } from "react";
import { getObjectData } from "../services/objectServices";
import usePersistedState from "../hooks/usePersistedState";
import * as storage from '../utils/memory';

export default function withObjectData(Component) {
  return function EnhancedComponent(props) {
    const [objectData, setObjectData] = usePersistedState('objectData', {});
    useEffect(() => {
      const fetchObjectData = async () => {
        try {
            const restaurantId = JSON.parse(storage.getItem('restaurantId'));
            const response = await getObjectData(Number(restaurantId));
            setObjectData(response.objectData)
        } catch (error) {
          console.error('Error while trying to fetch object data:', error);
          localStorage.clear();
        }
      };

      fetchObjectData();
    }, []);

    return <Component {...props} objectData={objectData} />;
  };
  
}
