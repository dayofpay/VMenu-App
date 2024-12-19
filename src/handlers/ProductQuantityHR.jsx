export const incrementQuantity = (quantity, setQuantity) => setQuantity(quantity + 1);
  
export const decrementQuantity = (quantity, setQuantity) =>
  setQuantity(Math.max(1, quantity - 1));
