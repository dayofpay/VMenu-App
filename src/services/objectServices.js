
import * as request from '../lib/request';
import { getEnv } from '../utils/appData';
export async function getObjectData(objectId) {

    try{
        const response = await request.get(`${getEnv()}/api/objects/${objectId}/information`);
        return response;
    }catch(error){
        console.log('Error in getObjectData',error);
    }
}
