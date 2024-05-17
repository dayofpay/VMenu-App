
import * as request from '../lib/request';
export async function getObjectData(objectId) {

    try{
        const response = await request.get(`https://v-menu.eu/api/objects/${objectId}/information`);
        return response;
    }catch(error){
        console.log('Error in getObjectData',error);
    }
}
