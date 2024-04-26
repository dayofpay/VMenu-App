import { createContext} from "react";
import { useNavigate } from "react-router-dom";


import usePersistedState from "../hooks/usePersistedState";
import { ERROR_PATHS, PATH_LIST } from "../utils/pathList";
import { ProductDetailsKeys } from "../keys/formKeys";
import * as storage from '../utils/memory';
import { createCheckout } from "../services/userServices";
import FinalCheckoutPage from "../components/PageComponents/Checkout/Final";
import React from "react";
export const CartContext = createContext();

export const CartProvider = ({
    children,

}) => {
    const navigate = useNavigate();
    const [objectData,setObjectData] = usePersistedState('objectData',{});
    const cartUpdateHandler = (data,setProductExists) => {
        const createCart = () => {
            storage.setItem('cart',[data])
        }
        const updateCart = (cartObj) => {
            const productExists = cartObj.some((product) => product?.productId === data.productId);
            productExists ? null : storage.setItem('cart',[...cartObj,data]);
        }
        setProductExists(true);
        const cartObj = storage.getItem('cart');
        cartObj === null ? createCart() : updateCart(cartObj);
    }

    const cartDeleteHandler = (data,setProductExists) => {
        let cart = storage.getItem('cart');
        
    
        // Find the index of the item to delete
        const indexToDelete = cart.findIndex(item => item.productId === data.productId);
    
        if (indexToDelete !== -1) {

            cart.splice(indexToDelete, 1);
            

            storage.setItem('cart', cart);

            setProductExists(false);
        }
    }
    const checkoutHandler = async(data) => {
        const result = await createCheckout(data);

        if(!result.hasError){
            storage.removeItem('cart');
            navigate(PATH_LIST.FINAL_CHECKOUT)
        }

        else{
            navigate(ERROR_PATHS.CHECKOUT_ERROR);
        }
    }
    const logValues = {
        cartUpdateHandler,
        cartDeleteHandler,
        checkoutHandler,
        // Insert submit handlers here
  } 
     return (
        <CartContext.Provider value={logValues}>
            {children}
        </CartContext.Provider>
    )
}
CartContext.displayName = 'CartContext';
export default CartContext;