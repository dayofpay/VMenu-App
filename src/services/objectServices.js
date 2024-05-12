
import * as request from '../lib/request';
export async function getObjectData(objectId) {

    try{
        const response = await request.get(`http://192.168.0.105:3300/api/objects/${objectId}/information`);
        return response;
    }catch(error){
        console.log('Error in getObjectData',error);
    }
}
