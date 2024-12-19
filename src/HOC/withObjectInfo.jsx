// HOC
import { useState, useEffect } from "react";
import { getObjectData } from "../services/objectServices";
import usePersistedState from "../hooks/usePersistedState";
import * as storage from '../utils/memory';
import { createVisitor } from "../services/userServices";

export default function withObjectData(Component) {
  return function EnhancedComponent(props) {
    const [objectData, setObjectData] = usePersistedState('objectData', {});
    
    useEffect(() => {
      (async () => {
        try {
          const restaurantId = storage.getItem('restaurantId');
          
          if (restaurantId === null) {
            throw new Error('Restaurant ID is null');
          }

          const response = await getObjectData(Number(restaurantId));
          setObjectData(response.objectData);
        } catch (error) {
          console.error('Error while trying to fetch object data:', error);
          localStorage.clear();
        }
      })();
    }, []);

    if (objectData === null) {
      throw new Error('objectData is null');
    }

    return <Component {...props} objectData={objectData} />;
  };
  
}

