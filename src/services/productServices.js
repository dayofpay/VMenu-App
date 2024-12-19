import { get } from "../lib/request";
import { getEnv } from "../utils/appData";


export async function getProductData(productId) {
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    if (!objectId) {
        throw new Error('No restaurant ID found in local storage');
    }

    try {
        const productData = await get(`${getEnv()}/api/products/${objectId}/${productId}`);

        if (!productData) {
            throw new Error('No product data returned from the server');
        }

        return productData;
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
}

export async function getProductsByCategory(categoryId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const products = await get(`${getEnv()}/api/categories/${objectId}/${categoryId}`);

    return products;
}

export async function getProductAddonsList(productId){
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    const addons = await get(`${getEnv()}/api/addons/${objectId}/${productId}`);

    return addons;
}