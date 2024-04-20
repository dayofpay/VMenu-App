import { createContext} from "react";
import { useNavigate } from "react-router-dom";


import usePersistedState from "../hooks/usePersistedState";
import { PATH_LIST } from "../utils/pathList";
import { ProductDetailsKeys } from "../keys/formKeys";
import * as storage from '../utils/memory';
export const CartContext = createContext();

export const CartProvider = ({
    children,

}) => {
    const navigate = useNavigate();
    const [objectData,setObjectData] = usePersistedState('objectData',{});
    const cartUpdateHandler = (data) => {
        const createCart = () => {
            storage.setItem('cart',[data])
        }

        const updateCart = (cartObj) => {
            const productExists = cartObj.some((product) => product?.productId === data.productId);
            productExists ? null : storage.setItem('cart',[...cartObj,data]);
        }
        const cartObj = storage.getItem('cart');
        cartObj === null ? createCart() : updateCart(cartObj);
    }
    const logValues = {
        cartUpdateHandler,
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