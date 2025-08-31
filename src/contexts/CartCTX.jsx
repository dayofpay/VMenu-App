import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_PATHS, PATH_LIST } from "../utils/pathList";
import * as storage from '../utils/memory';
import { createCheckout } from "../services/userServices";

export const CartContext = createContext();

export const CartProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    /**
     * This function is responsible for updating the cart. It takes in the data of the product to be added
     * and updates the cart in local storage. If the product already exists in the cart, it is not added again.
     * @param {object} data - The data of the product to be added to the cart.
     * @param {function} setProductExists - A function that sets the productExists state to true or false.
     */
    const cartUpdateHandler = (data, setProductExists) => {
        // First we check if the cart already exists in local storage
        const createCart = () => {
            // If it doesn't, we create a new cart and add the product to it
            storage.setItem('cart', [data])
        }
        const updateCart = (cartObj) => {
            // If the cart already exists, we check if the product is already in it
            const productExists = cartObj.some((product) => product?.productId === data.productId);
            // If the product is not in the cart, we add it
            productExists ? null : storage.setItem('cart', [...cartObj, data]);
        }
        // Finally, we set the productExists state to true so that we can use it in the component
        setProductExists(true);
        // We get the cart from local storage
        const cartObj = storage.getItem('cart');
        // If the cart is null, we create a new one. Otherwise, we update the existing one
        cartObj === null ? createCart() : updateCart(cartObj);
    }

    /**
     * This function is responsible for deleting a product from the cart. It takes in the data of the product to be deleted
     * and deletes it from the cart in local storage.
     * @param {object} data - The data of the product to be deleted from the cart.
     * @param {function} setProductExists - A function that sets the productExists state to true or false.
     */
    const cartDeleteHandler = (data, setProductExists) => {
        let cart = storage.getItem('cart');
        
        // Find the index of the item to delete
        const indexToDelete = cart.findIndex(item => item.productId === data.productId);
    
        if (indexToDelete !== -1) {
            cart.splice(indexToDelete, 1);
            storage.setItem('cart', cart);
            setProductExists(false);
        }
    }

    /**
     * This function is responsible for handling the checkout process. It takes in the data of the products to be purchased
     * and sends it to the server. If the server responds with a success message, we clear the cart and navigate to the final checkout page.
     * @param {object} data - The data of the products to be purchased.
     */
    const checkoutHandler = async (data) => {
        // Get applied discount from localStorage
        const appliedDiscount = storage.getItem('appliedDiscount');
        
        const result = await createCheckout({
            ...data,
            discountData: appliedDiscount // Add discount data to the request
        });

        if (!result.hasError) {
            storage.removeItem('cart');
            storage.removeItem('selectedAddons');
            storage.removeItem('appliedDiscount'); // Remove discount after successful order
            navigate(PATH_LIST.FINAL_CHECKOUT);
        } else {
            navigate(ERROR_PATHS.CHECKOUT_ERROR);
        }
    }

    const logValues = {
        cartUpdateHandler,
        cartDeleteHandler,
        checkoutHandler,
    } 

    return (
        <CartContext.Provider value={logValues}>
            {children}
        </CartContext.Provider>
    )
}

CartContext.displayName = 'CartContext';
export default CartContext;