import {

    Navigate, Outlet,

  } from 'react-router-dom';
import * as storage from '../utils/memory';
import { ERROR_PATHS, PATH_LIST } from '../utils/pathList';


/**
 * Higher Order Component that checks if the user is in a restaurant 
 * and at a table. If not, redirects to a specified path.
 * 
 * @param {Object} props The props that are passed to the component.
 * @param {string} [props.redirectPath=ERROR_PATHS.QR_ERROR] The path that the user should be redirected to if they are not in a restaurant or at a table.
 * @returns {JSX.Element} A JSX element that will either render the original component or a redirect.
 */
const RequireObjectState = ({
    redirectPath = ERROR_PATHS.QR_ERROR,
  }) => {

    /**
     * Get the restaurant ID from local storage
     * @type {string}
     */
    const restaurantId = localStorage.getItem('restaurantId');

    /**
     * Get the table ID from local storage
     * @type {string}
     */
    const tableId = localStorage.getItem('tableId');

    /**
     * If the user is not in a restaurant or at a table, redirect them to the specified path.
     */
    if (!restaurantId || !tableId) {
        return <Navigate to={redirectPath} replace />;
    }

    /**
     * If the user is in a restaurant and at a table, render the original component.
     */
    return <Outlet/>
  };

export default RequireObjectState;