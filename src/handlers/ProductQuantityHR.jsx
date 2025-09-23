import { do_action } from "../services/userServices";
import * as storage from '../utils/memory';
export const incrementQuantity = (productId,quantity, setQuantity) => {
  const cart = storage.getItem("cart") || [];
  const product = cart.find(p => Number(p.productId) === Number(productId));
  if (!product) return;
  const newQuantity = quantity + 1;
  setQuantity(newQuantity);
  product.productQuantity = newQuantity;
  storage.setItem("cart", cart);
  do_action("click_button", {button_name:"Увеличаване на количество",quantity: quantity + 1});
};
  
/**
 * Decrement the quantity of a product in the cart.
 * @param {number} quantity - The current quantity of the product in the cart.
 * @param {function} setQuantity - The function to update the quantity of the product in the cart.
 */
export const decrementQuantity = (productId,quantity, setQuantity) => {
  do_action("click_button", {button_name:"Намаляне на количество",quantity});
  const cart = storage.getItem("cart") || [];
  const product = cart.find(p => Number(p.productId) === Number(productId));
  if (!product) return;
  const newQuantity = quantity - 1;
  // Check if the product quantity is more than 1
  if (quantity > 1) {
    // If it is, decrement the quantity by 1
    setQuantity(newQuantity);
    product.productQuantity = newQuantity;
    storage.setItem("cart", cart);
  } else {
    // If it's not, set the quantity to 1 to prevent it from going below 1
    setQuantity(1);
    product.productQuantity = 1;
    storage.setItem("cart", cart);
  }
};
