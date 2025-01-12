import * as storage from '../utils/memory';

/**
 * Decrement the quantity of a product in the cart.
 * If the product quantity is 1, do not decrement it further.
 * @param {number} productId - The id of the product to decrement.
 */
export const decrementCartQuantity = (productId) => {
    // Get the cart from local storage
    const cartStorage = storage.getItem('cart');
    
    // Find the index of the product in the cart
    const idx = cartStorage.findIndex(p => p.productId === productId);

    // If the product is found and its quantity is more than 1, decrement it
    if (idx >= 0 && cartStorage[idx].productQuantity > 1) {
        cartStorage[idx].productQuantity--;
        // Save the updated cart back to local storage
        storage.setItem('cart', cartStorage);
    }
}


/**
 * Increment the quantity of a product in the cart.
 * This function takes in a productId and increments the quantity of the product
 * with that id in the cart. If the product is not found in the cart, do nothing.
 * @param {number} productId - The id of the product to increment.
 */
export const incrementCartQuantity = (productId) => {
    // Get the cart from local storage
    const cartStorage = storage.getItem('cart');

    // Find the product in the cart with the given id
    const product = cartStorage.find(
        (p) => Number(p.productId) === Number(productId)
    );

    // If the product is found, increment its quantity
    if (product) {
        product.productQuantity += 1;

        // Save the updated cart back to local storage
        storage.setItem('cart', cartStorage);
    }
};

/**
 * Remove a product from the cart.
 * This function takes in the id of the product to remove and removes it from the cart.
 * If the product is not found in the cart, do nothing.
 * @param {number} productId - The id of the product to remove from the cart.
 */
export const removeCartItem = (productId) => {
    // Get the cart from local storage
    const cartStorage = storage.getItem('cart');

    // Find the index of the product in the cart
    const idx = cartStorage.findIndex(p => p.productId === productId);

    // If the product is found, remove it from the cart
    if (idx >= 0) {
        cartStorage.splice(idx, 1);
        // Save the updated cart back to local storage
        storage.setItem('cart', cartStorage);
    }
};

/**
 * Clear the cart.
 * This function removes the cart from local storage.
 * After calling this function, the cart will be empty and the user will not have any products in their cart.
 */
export const clearCart = () => {
    // Remove the cart from local storage
    storage.removeItem('cart');
};
