import { useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { getMenuLanguage } from '../../../services/appServices';
import { interpolateString } from '../../../utils/stringUtiils';

const calculateTotalPrice = (addonsList) =>
  addonsList.reduce(
    (total, addon) => total + addon.addon_price * addon.addon_quantity,
    0
  );

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
  
  const addons = useMemo(() => {
    const storedAddons = JSON.parse(localStorage.getItem("selectedAddons")) || [];
    return getAddonsForProduct(product?.item_id, storedAddons);
  }, [product, selectedAddons]);

  const totalPrice = useMemo(() => calculateTotalPrice(addons), [addons]);

  if (addons.length === 0) return null;

  return (
    <>
      <style jsx>{`
        .addons-section {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin: 1rem 0;
          padding: 1.25rem;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .addons-header {
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .addons-header h2 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1d1d1f;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .addons-cards {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .addon-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          padding: 0.875rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .addon-card:hover {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0, 0, 0, 0.12);
          transform: translateY(-1px);
        }

        .addon-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          margin-right: 1rem;
        }

        .addon-info {
          display: flex;
          flex-direction: column;
        }

        .addon-title {
          font-size: 0.95rem;
          font-weight: 500;
          margin: 0 0 0.2rem 0;
          color: #1d1d1f;
        }

        .addon-details {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .addon-price {
          font-size: 0.9rem;
          color: #6e6e73;
          font-weight: 500;
        }

        .addon-quantity {
          font-size: 0.85rem;
          color: #86868b;
          background: rgba(0, 0, 0, 0.04);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        .remove-addon {
          background: transparent;
          border: none;
          color: #ff3b30;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .remove-addon:hover {
          background: rgba(255, 59, 48, 0.1);
        }

        .addons-footer {
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .total-price {
          font-size: 1.05rem;
          font-weight: 600;
          color: #1d1d1f;
          text-align: right;
        }

        @media (max-width: 768px) {
          .addons-section {
            padding: 1rem;
            margin: 0.75rem 0;
          }
          
          .addon-card {
            padding: 0.75rem;
          }
          
          .addon-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .addon-details {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

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
                  <div className="addon-info">
                    <p className="addon-title">{addon.addon_name}</p>
                    <div className="addon-details">
                      <span className="addon-price">
                        {addon.addon_price.toFixed(2)} {product.item_currency}
                      </span>
                      <span className="addon-quantity">
                        ×{addon.addon_quantity}
                      </span>
                    </div>
                  </div>
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
    </>
  );
};

export default CartAddons;