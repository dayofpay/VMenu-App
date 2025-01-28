
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

/**
 * @function hasAddon
 * 
 * This function takes an addon as an argument and returns a boolean indicating
 * whether the addon is available in the user's license.
 * 
 * The function works by first retrieving the object data from local storage.
 * The object data is an object containing information about the user's license.
 * The perks data is then extracted from the object data. The perks data is an
 * array of strings, where each string is the name of an addon that is available
 * to the user.
 * 
 * The function then checks if the provided addon is in the perks data array.
 * If it is, the function returns true. Otherwise, it returns false.
 * 
 * @param {string} addon the addon to check for
 * @returns {boolean} true if the addon is available, false otherwise
 */
export function hasAddon(addon) {
    try {
        // Retrieve the object data from local storage
        const object_Data = JSON.parse(localStorage.getItem('objectData'))['license'];

        // Check that the object data is not null or undefined
        if (!object_Data) {
            throw new Error('Object data is null or undefined');
        }

        // Extract the perks data from the object data
        const perks_Data = JSON.parse(object_Data['perksData']['modules']);

        // Check that the perks data is not null or undefined
        if (!perks_Data) {
            throw new Error('Perks data is null or undefined');
        }

        // Check if the provided addon is in the perks data array
        if (perks_Data.includes(addon)) {
            // If the addon is in the array, return true
            return true;
        }
    } catch (error) {
        // Log any error encountered during the request
        console.log('Error in hasAddon', error);
    }

    // If the addon is not in the array, return false
    return false;
}

