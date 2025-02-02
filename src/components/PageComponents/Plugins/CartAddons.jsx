import { useMemo } from 'react';
import "../../Styles/CartAddons.css";

/**
 * Calculate the total price of the add-ons.
 * @param {Array} addonsList - List of addon objects.
 * @returns {number} Total price.
 */
const calculateTotalPrice = (addonsList) =>
  addonsList.reduce(
    (total, addon) => total + addon.addon_price * addon.addon_quantity,
    0
  );

/**
 * Retrieve the add-ons for a specific product.
 * @param {string|number} productId - The id of the product.
 * @param {Array} storedAddons - List of all selected addons from local storage.
 * @returns {Array} Filtered list of addons for the product.
 */
const getAddonsForProduct = (productId, storedAddons) => {
  const productAddons = storedAddons.filter(
    (addon) => addon.item_id === productId
  );
  return productAddons.length > 0
    ? productAddons.map((addon) => addon.addons).flat()
    : [];
};

const CartAddons = ({ product, handleRemoveAddon, selectedAddons }) => {
  // Memoize the add-ons for the current product. 
  // This recalculates only when `product` or `selectedAddons` changes.
  const addons = useMemo(() => {
    const storedAddons = JSON.parse(localStorage.getItem("selectedAddons")) || [];
    return getAddonsForProduct(product?.item_id, storedAddons);
  }, [product, selectedAddons]);

  // Compute the total price based on the current addons.
  const totalPrice = useMemo(() => calculateTotalPrice(addons), [addons]);

  // If there are no addons, don't render anything.
  if (addons.length === 0) return null;

  return (
    <div className="addons-section">
      <h6>Добавки:</h6>
      <ul className="addons-list">
        {addons.map((addon) => (
          <li key={addon.addon_id} className="addon-item">
            <span className="addon-name">
              {addon.addon_name} - {addon.addon_quantity}
            </span>
            <button
              className="remove-addon"
              onClick={() => handleRemoveAddon(addon.addon_id)}
            >
              Премахни
            </button>
          </li>
        ))}
      </ul>
      <div className="total-price">
        <strong>Обща цена: {totalPrice.toFixed(2)} лв.</strong>
      </div>
    </div>
  );
};

export default CartAddons;
