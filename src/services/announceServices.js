import * as request from '../lib/request';
import { getEnv } from '../utils/appData';


export async function getAnnounceData(announceId) {
    const objectId = JSON.parse(localStorage.getItem('objectData'))['objectInformation']['object_id'];
    try {
        const response = await request.get(`${getEnv()}/api/announces/${objectId}/${announceId}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error in getAnnounceData', error);
    }
}