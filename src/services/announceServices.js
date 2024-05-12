import * as request from '../lib/request';


export async function getAnnounceData(announceId) {
    const objectId = JSON.parse(localStorage.getItem('objectData'))['objectInformation']['object_id'];
    try {
        const response = await request.get(`http://192.168.0.105:3300/api/announces/${objectId}/${announceId}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error in getAnnounceData', error);
    }
}