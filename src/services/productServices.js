import { get } from "../lib/request";
import { getEnv } from "../utils/appData";


export async function getProductData(productId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const productData = await get(`${getEnv()}/api/products/${objectId}/${productId}`);

    return productData;
}

export async function getProductsByCategory(categoryId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const products = await get(`${getEnv()}/api/categories/${objectId}/${categoryId}`);

    return products;
}