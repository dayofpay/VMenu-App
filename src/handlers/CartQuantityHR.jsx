import * as storage from '../utils/memory';

export const decrementCartQuantity = (productId) => {
    const cartStorage = storage.getItem('cart');
    const idx = cartStorage.findIndex(p => p.productId === productId);
    if (idx >= 0 && cartStorage[idx].productQuantity > 1) {
        cartStorage[idx].productQuantity--;
        storage.setItem('cart', cartStorage);
    }
}


export const incrementCartQuantity = (productId) => {
    const cartStorage = storage.getItem('cart');
    const product = cartStorage.find(p => Number(p.productId) === Number(productId));
    if (product) {
        product.productQuantity += 1;
        storage.setItem('cart', cartStorage);
    }
}

export const removeCartItem = (productId) => {
    const cartStorage = storage.getItem('cart');
    const idx = cartStorage.findIndex(p => p.productId === productId);
    if (idx >= 0) {
        cartStorage.splice(idx, 1);
        storage.setItem('cart', cartStorage);
    }
};

export const clearCart = () => {
    storage.removeItem('cart');
};