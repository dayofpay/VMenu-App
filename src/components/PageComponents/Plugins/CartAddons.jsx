import { useMemo } from 'react';
import "../../Styles/CartAddons.css";
import { motion, AnimatePresence } from "framer-motion";
import { getMenuLanguage } from '../../../services/appServices';
import {interpolateString} from '../../../utils/stringUtiils';
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
  const menuLanguage = getMenuLanguage();
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
    <section className="addons-section" aria-labelledby="addons-heading">
      <header className="addons-header">
        <h2 id="addons-heading">{menuLanguage.Addons}</h2>
      </header>
      <AnimatePresence>
        <motion.div
          className="addons-cards"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {addons.map((addon) => (
            <motion.div
              key={addon.addon_id}
              className="addon-card"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="addon-content">
                <p className="addon-title">{addon.addon_name}</p>
                <p className="addon-quantity">x{addon.addon_quantity}</p>
              </div>
              <motion.button
                className="remove-addon"
                onClick={() => handleRemoveAddon(addon.addon_id)}
                aria-label={`Премахни ${addon.addon_name}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                ✕
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <footer className="addons-footer">
        <motion.div
          className="total-price"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
            {interpolateString(menuLanguage.Total_Addons_Price, {
              totalPrice: totalPrice.toFixed(2),
              currency: product.item_currency
            })}
        </motion.div>
      </footer>
    </section>
  );
};

export default CartAddons;
