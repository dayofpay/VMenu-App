// SetOptions.jsx

import React, { useEffect } from 'react';
import usePersistedState from '../../hooks/usePersistedState';
import { useNavigate, useParams } from 'react-router-dom';

const SetOptions = () => {
  const { objectId, tableId } = useParams();
  const [restaurantId, setRestaurantId] = usePersistedState('restaurantId', '');
  const [table, setTable] = usePersistedState('tableId','');

  const navigate = useNavigate();

  useEffect(() => {
    setRestaurantId(objectId);
    setTable(tableId);
    localStorage.removeItem('cart');
    navigate('/');
  }, [navigate, restaurantId, table]);

  return null;
};

export default SetOptions;
