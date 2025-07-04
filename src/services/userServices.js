import * as request from '../lib/request';
import { getEnv } from '../utils/appData';
import * as storage from '../utils/memory';
/**
 * Function to create a visitor on the server side
 * 
 * @returns {Object} an object with the following structure: {hasError: boolean, msg: string}
 */
export async function createVisitor() {
    /**
     * The endpoint that we will make a POST request to
     */
    const endpoint = `${getEnv()}/api/visitors/set`;

    /**
     * The table ID and object ID are retrieved from local storage
     */
    let table_ID = null;
    let object_id = null;

    try {
        /**
         * Try to parse the table ID and object ID from local storage
         */
        table_ID = JSON.parse(localStorage.getItem('tableId'));
        object_id = JSON.parse(localStorage.getItem('restaurantId'));
    } catch (error) {
        /**
         * If an error occurs while trying to parse the local storage, log the error
         */
        console.error('Error while trying to parse local storage:', error);

        /**
         * Return an object with hasError set to true and an appropriate error message
         */
        return {
            hasError: true,
            msg: 'Some error happened while trying to set visitor'
        }
    }

    /**
     * If either the table ID or object ID is null, log an error and return an appropriate object
     */
    if (!table_ID || !object_id) {
        console.error('Error while trying to create visitor: tableId or restaurantId is null');

        return {
            hasError: true,
            msg: 'Table ID or restaurant ID is null'
        }
    }

    /**
     * Try to make a POST request to the endpoint with the table ID and object ID
     */
    try {
        const response = await request.post(endpoint, {
            table_ID,
            object_id,
        });

        /**
         * If the request is successful, return an object with hasError set to false and the message from the server
         */
        return {
            hasError: false,
            msg: response.message,
            user_token: response.USER_TOKEN
        }
    } catch (error) {
        /**
         * If an error occurs while making the request, log the error and return an appropriate object
         */
        console.error('Error while trying to create visitor:', error);

        return {
            hasError: true,
            msg: 'Some error happened while trying to set visitor'
        }
    }

}


export async function createCheckout(data){
    const endpoint = `${getEnv()}/api/orders/create`;

    const table_ID = JSON.parse(localStorage.getItem('tableId'));
    const object_id = JSON.parse(localStorage.getItem('restaurantId'));

    try{
        const response = await request.post(endpoint,{
            objectData : {
                table_ID,
                object_id
            },
            customerData : data,
            cartData : storage.getItem('cart'),
            item_addons: storage.getItem('selectedAddons'),
        })
        return response
    }
    catch(error){
        console.error('Error while trying to create order',error);

        return error;
    }
}


export async function createCall(data){
    const endpoint = `${getEnv()}/api/calls/create`;

    const table_ID = JSON.parse(localStorage.getItem('tableId'));
    const object_id = JSON.parse(localStorage.getItem('restaurantId'));

    try{
        const response = await request.post(endpoint,{
            object_id,
            call_reason: data.call_reason,
            table: table_ID,
        })
        return {hasError: false, msg: response.message}
    }
    catch(error){
        console.error('Error while trying to create call',error);

        return {hasError: true, msg: response.message};
    }
}


/**
 * Logs an action by making a POST request to the server.
 *
 * @param {string} action_type - The type of action being logged.
 * @param {object} action_data - The data associated with the action.
 * @param {string} [action_comment] - The comment associated with the action.
 * @param {string} [token] - The user token from local storage. If not provided, it will be taken from local storage.
 * @returns {Promise<object>} - The server response if the request is successful.
 */
export async function do_action(action_type, action_data, action_comment = null, token = localStorage.getItem('user_token')) {
    // Define the endpoint for logging actions
    const endpoint = `${getEnv()}/api/actions/log`;

    try {
        // Make a POST request to the server with the action details and token
        const response = await request.post(endpoint, {
            action_type,
            action_data,
            action_comment,
            token_id: token,
        });

        console.log(response);
        
        // Return the server response
        return response;
    } catch (error) {
        // Log any errors that occur during the request
        console.error('Error while trying to create action log', error);
    }
}
