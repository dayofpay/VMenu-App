import * as request from '../lib/request';


export async function getAnnounceData(announceId) {
    const objectId = JSON.parse(localStorage.getItem('objectData'))['objectInformation']['object_id'];
    try {
        const response = await request.get(`https://v-menu.eu/api/announces/${objectId}/${announceId}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error in getAnnounceData', error);
    }
}