import * as request from '../lib/request';
import localeData from '../locales/locales';

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


/**
 * This function retrieves the menu language from the local storage object data.
 * It first parses the stored object data as JSON and then accesses the 'menu_language' property of the 'objectInformation' object.
 * 
 * @return {string} The menu language, which is a string representing the selected language for the menu.
 */
export function getMenuLanguage() {
    // Retrieve the object data from local storage
    const objectData = JSON.parse(localStorage.getItem('objectData'));

    // Access the 'menu_language' property of the 'objectInformation' object
    const menuLanguage = objectData?.['objectInformation']?.['menu_language'] || 'bg';

    // Return the menu language
    return localeData.APP_LOCALES?.[menuLanguage];
}

/**
 * This function retrieves the menu language from the local storage object data.
 * It first parses the stored object data as JSON and then accesses the 'menu_language' property of the 'objectInformation' object.
 * 
 * @return {string} The menu language, which is a string representing the selected language for the menu.
 */
export function getLocale(){
    // Retrieve the object data from local storage
    const objectData = JSON.parse(localStorage.getItem('objectData'));

    // Access the 'menu_language' property of the 'objectInformation' object
    const menuLanguage = objectData['objectInformation']['menu_language'] || 'bg';

    // Return the menu language
    return menuLanguage;
}
