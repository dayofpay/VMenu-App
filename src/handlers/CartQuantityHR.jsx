import * as storage from '../utils/memory';

export const decrementCartQuantity = (productId) => {
    const cartStorage = storage.getItem('cart');
    const currentQuantity = cartStorage.find((product) => product.productId === productId).productQuantity;
    if(currentQuantity > 1){
        const updatedCart = cartStorage.map((product) => {
            if(product.productId === productId){
                return {...product, productQuantity: product.productQuantity - 1};
            }
            return product;
        });
        storage.setItem('cart', updatedCart);
    }
}

export const incrementCartQuantity = (productId) => {
    const cartStorage = storage.getItem('cart');
    const updatedCart = cartStorage.map((product) => {
        if(Number(product.productId) === Number(productId)){
            return {...product, productQuantity: product.productQuantity + 1};
        }
        console.log(product);
        return product;
    });
    storage.setItem('cart', updatedCart);
}

export const removeCartItem = (productId) => {
    const cartStorage = storage.getItem('cart');
    const updatedCart = cartStorage.filter((product) => product.productId !== productId);
    storage.setItem('cart', updatedCart);
};

export const clearCart = () => {
    storage.removeItem('cart');
};