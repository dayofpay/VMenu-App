import { get } from "../lib/request";
import { getEnv } from "../utils/appData";


/**
 * Fetches product data from the server.
 * @param {number} productId - The id of the product to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the product data.
 * @throws {Error} - If there is no restaurant id in local storage or if the server returns an error.
 */
export async function getProductData(productId) {
    // Get the restaurant ID from local storage. This is set when the user selects a restaurant.
    const objectId = JSON.parse(localStorage.getItem('restaurantId'));
    if (!objectId) {
        // If there is no restaurant ID in local storage, throw an error.
        throw new Error('No restaurant ID found in local storage');
    }

    try {
        // Construct the API endpoint using the environment variable and received IDs.
        const productData = await get(`${getEnv()}/api/products/${objectId}/${productId}`);

        // If the server did not return any data, throw an error.
        if (!productData) {
            throw new Error('No product data returned from the server');
        }

        // Return the product data from the server.
        return productData;
    } catch (error) {
        // Log the error to the console.
        console.error('Error fetching product data:', error);
        // Re-throw the error so that it can be handled by the caller.
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

    return addons || [];
}