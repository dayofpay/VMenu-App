
import * as request from '../lib/request';
import { getEnv } from '../utils/appData';
/**
 * @function getObjectData
 * 
 * This function is responsible for fetching object information from the server.
 * It takes an object ID as an argument and returns the object information
 * response from the server.
 * 
 * @param {number} objectId the ID of the object to fetch
 * @returns {Promise<Object>} a promise that resolves to an object containing the object information
 */
export async function getObjectData(objectId) {

    try{
        // Construct the API endpoint using the environment variable and received IDs
        const endpoint = `${getEnv()}/api/objects/${objectId}/information`;

        // Make a GET request to the constructed endpoint
        const response = await request.get(endpoint);

        // Log the response for debugging purposes
        console.log('Successful object data fetch:',response);

        // Return the response from the server
        return response;
    }catch(error){
        // Log any error encountered during the request
        console.log('Error in getObjectData',error);
    }
}

