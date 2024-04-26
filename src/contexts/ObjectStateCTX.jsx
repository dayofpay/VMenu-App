import {

    Navigate, Outlet,

  } from 'react-router-dom';
import * as storage from '../utils/memory';
import { ERROR_PATHS, PATH_LIST } from '../utils/pathList';

const RequireObjectState = ({
    redirectPath = ERROR_PATHS.QR_ERROR,
  }) => {

    const restaurantId = localStorage.getItem('restaurantId');
    const tableId = localStorage.getItem('tableId');

    if (!restaurantId || !tableId) {
        return <Navigate to={redirectPath} replace />;
    }


    return <Outlet/>
  };

export default RequireObjectState;