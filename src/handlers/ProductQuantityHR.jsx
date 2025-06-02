import { do_action } from "../services/userServices";

export const incrementQuantity = (quantity, setQuantity) => {
  setQuantity(quantity + 1)
  do_action("click_button", {button_name:"Увеличаване на количество",quantity: quantity + 1});
};
  
/**
 * Decrement the quantity of a product in the cart.
 * @param {number} quantity - The current quantity of the product in the cart.
 * @param {function} setQuantity - The function to update the quantity of the product in the cart.
 */
export const decrementQuantity = (quantity, setQuantity) => {
  do_action("click_button", {button_name:"Намаляне на количество",quantity});
  // Check if the product quantity is more than 1
  if (quantity > 1) {
    // If it is, decrement the quantity by 1
    setQuantity(quantity - 1);
  } else {
    // If it's not, set the quantity to 1 to prevent it from going below 1
    setQuantity(1);
  }
};
