import * as request from '../lib/request';
import * as storage from '../utils/memory';
export async function createVisitor(){
    const endpoint = 'https://v-menu.eu/api/visitors/set';
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


export async function createCheckout(data){
    const endpoint = 'https://v-menu.eu/api/orders/create';

    const table_ID = JSON.parse(localStorage.getItem('tableId'));
    const object_id = JSON.parse(localStorage.getItem('restaurantId'));

    try{
        const response = await request.post(endpoint,{
            objectData : {
                table_ID,
                object_id
            },
            customerData : data,
            cartData : storage.getItem('cart'),
        })
        return response
    }
    catch(error){
        console.error('Error while trying to create order',error);

        return error;
    }
}