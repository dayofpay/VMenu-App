// HOC
import { useState, useEffect } from "react";
import { getObjectData } from "../services/objectServices";
import usePersistedState from "../hooks/usePersistedState";

export default function withObjectData(Component) {
  return function EnhancedComponent(props) {
    const [objectData, setObjectData] = usePersistedState('objectData', {});
    useEffect(() => {
      const fetchObjectData = async () => {
        try {
            const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
            const response = await getObjectData(Number(restaurantId));
            setObjectData(response.objectData)
        } catch (error) {
          console.error('Error while trying to fetch object data:', error);
        }
      };

      fetchObjectData();
    }, []);

    return <Component {...props} objectData={objectData} />;
  };
  
}
