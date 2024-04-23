// SetOptions.jsx

import React, { useEffect } from 'react';
import usePersistedState from '../../hooks/usePersistedState';
import { useNavigate, useParams } from 'react-router-dom';
import { createVisitor } from '../../services/userServices';
import * as storage from '../../utils/memory';
const SetOptions = () => {
  const { objectId, tableId } = useParams();
  const [restaurantId, setRestaurantId] = usePersistedState('restaurantId', '');
  const [table, setTable] = usePersistedState('tableId','');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setRestaurantId(objectId);
    setTable(tableId);
    const APP_NEW_VISITOR = async () => {
       await createVisitor().then((result) => {
        if(result.hasError){
          navigate('/qr-error')
        }
        else{
          storage.setItem('visitorData', result);
        }
      });
    }
    APP_NEW_VISITOR();;
    navigate('/');
  }, [navigate, restaurantId, table]);

  return null;
};

export default SetOptions;
