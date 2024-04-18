import { get } from "../lib/request";


export async function getProductData(productId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const productData = await get(`http://localhost:3300/api/products/${objectId}/${productId}`);

    return productData;
}