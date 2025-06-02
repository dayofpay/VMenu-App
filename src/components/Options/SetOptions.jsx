// SetOptions.jsx

import React, { useEffect } from 'react';
import usePersistedState from '../../hooks/usePersistedState';
import { useNavigate, useParams } from 'react-router-dom';
import { createVisitor } from '../../services/userServices';
import * as storage from '../../utils/memory';
import { ERROR_PATHS } from '../../utils/pathList';
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
          if(result.error_code === 'VMENU_TABLE_NOT_FOUND'){
            navigate(ERROR_PATHS.OBJECT_ERROR)
          }
          else{
            navigate(ERROR_PATHS.QR_ERROR)
          }
        }
        else{
          console.log(result,'RES');
          
          storage.setItem('visitorData', result);
          storage.setItem('user_token', result.user_token);
        }
      });
    }
    APP_NEW_VISITOR();;
    navigate('/');
  }, [navigate, restaurantId, table]);

  return null;
};

export default SetOptions;
