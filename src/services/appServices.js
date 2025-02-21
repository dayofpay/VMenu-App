import * as request from '../lib/request';

import { getEnv } from '../utils/appData';
import { getObjectData } from './objectServices';


export async function getLandingPageSettings() {
    try {
        // Retrieve the object data from local storage
        const object_Data = await getObjectData(JSON.parse(localStorage.getItem('objectData'))['objectInformation']['object_id']);

        // Check that the object data is not null or undefined
        if (!object_Data) {
            throw new Error('Object data is null or undefined');
        }

        // Return the landing page settings from the object data
        console.log(object_Data);
        
    } catch (error) {
        // Log any error encountered during the request
        console.log('Error in getLandingPageSettings', error);
    }
}