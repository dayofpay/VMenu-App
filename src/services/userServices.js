import * as request from '../lib/request';

export async function createVisitor(){
    const endpoint = 'http://localhost:3300/api/visitors/set';
    const table_ID = JSON.parse(localStorage.getItem('tableId'));
    const object_id = JSON.parse(localStorage.getItem('restaurantId'));
    try{
        const response = await request.post(endpoint,{
            table_ID,
            object_id, 
        })
        return response;
    }
    catch(error){
        console.error('Error while trying to create visitor:', error);

        return error;
    }

}