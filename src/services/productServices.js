import { get } from "../lib/request";


export async function getProductData(productId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const productData = await get(`https://v-menu.eu/api/products/${objectId}/${productId}`);

    return productData;
}

export async function getProductsByCategory(categoryId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const products = await get(`https://v-menu.eu/api/categories/${objectId}/${categoryId}`);

    return products;
}