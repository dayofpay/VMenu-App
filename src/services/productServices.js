import { get } from "../lib/request";


export async function getProductData(productId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const productData = await get(`http://192.168.0.105:3300/api/products/${objectId}/${productId}`);

    return productData;
}

export async function getProductsByCategory(categoryId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const products = await get(`http://192.168.0.105:3300/api/categories/${objectId}/${categoryId}`);

    return products;
}