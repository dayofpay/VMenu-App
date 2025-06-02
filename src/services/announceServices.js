import * as request from '../lib/request';
import { getEnv } from '../utils/appData';
import { do_action } from './userServices';


// This function is for fetching announcement data from the server
export async function getAnnounceData(announceId) {
    // Retrieve the object ID from local storage, assuming it's stored under 'objectData'
    // and that it contains an 'objectInformation' object with an 'object_id' field
    const objectId = JSON.parse(localStorage.getItem('objectData'))['objectInformation']['object_id'];
    
    try {
        // Construct the API endpoint using the environment variable and received IDs
        const response = await request.get(`${getEnv()}/api/announces/${objectId}/${announceId}`);
        
        // Log the response for debugging purposes
        console.log(response);
        
        // Return the response from the server

        do_action("view_announce", {announce_id: announceId});
        return response;
    } catch (error) {
        // Log any error encountered during the request
        console.log('Error in getAnnounceData', error);
    }
}
