import {

    Navigate, Outlet,

  } from 'react-router-dom';

const RequireObjectState = ({
    redirectPath = '/error',
  }) => {

    const restaurantId = localStorage.getItem('restaurantId');
    const tableId = localStorage.getItem('tableId');

    if (!restaurantId || !tableId) {
        return <Navigate to={redirectPath} replace />;
    }


    return <Outlet/>
  };

export default RequireObjectState;