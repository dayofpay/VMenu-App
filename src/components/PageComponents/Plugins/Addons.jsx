import React, { useState, useEffect, useRef } from "react";
import { do_action } from "../../../services/userServices";
import "../../Styles/AddonsList.css";

const ProductAddons = ({ productData, ADDONS_LIST, productInCart }) => {
  const [showAddons, setShowAddons] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [swiping, setSwiping] = useState(null);
  const MAX_ADDONS = productData?.settings?.MODIFIERS?.MAX_ADDONS || 5;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const itemRefs = useRef({});

  useEffect(() => {
    const savedAddons = JSON.parse(localStorage.getItem("selectedAddons")) || [];
    setSelectedAddons(savedAddons);
  }, [productData]);

  const countSelectedAddonsForProduct = () => {
    return selectedAddons.filter((item) => item.item_id === productData.item_id).length;
  };

  const countTotalAddonsForProduct = () => {
    return selectedAddons
      .filter((item) => item.item_id === productData.item_id)
      .reduce((total, item) => total + item.addons.addon_quantity, 0);
  };

  const toggleAddons = () => {
    setShowAddons(!showAddons);
    const button_name = showAddons ? "Покажи добавки" : "Скрий добавки";
    do_action("click_button", { button_name: button_name });
  };

  const handleAddonToggle = (addon) => {
    if (!addon || !addon.addon_id) return;

    const existingProductAddon = selectedAddons.find(
      (item) =>
        item.item_id === productData.item_id &&
        item.addons.addon_id === addon.addon_id
    );

    let updatedSelectedAddons;

    if (existingProductAddon) {
      do_action("remove_addon", { addon_name: addon.addon_name });
      updatedSelectedAddons = selectedAddons.filter(
        (item) => item !== existingProductAddon
      );
    } else {
      const totalAddons = countTotalAddonsForProduct();
      if (totalAddons >= MAX_ADDONS) return;

      do_action("add_addon", { addon_name: addon.addon_name });
      updatedSelectedAddons = [
        ...selectedAddons,
        {
          item_id: productData.item_id,
          addons: {
            addon_id: addon.addon_id,
            addon_name: addon.addon_name,
            addon_price: addon.addon_price,
            addon_quantity: 1,
          },
        },
      ];
    }

    setSelectedAddons(updatedSelectedAddons);
    localStorage.setItem("selectedAddons", JSON.stringify(updatedSelectedAddons));
  };

  const handleQuantityChange = (addon, quantity) => {
    const currentTotal = countTotalAddonsForProduct();
    const currentQuantity =
      selectedAddons.find(
        (item) =>
          item.item_id === productData.item_id &&
          item.addons.addon_id === addon.addon_id
      )?.addons.addon_quantity || 0;

    if (currentTotal - currentQuantity + quantity > MAX_ADDONS) return;

    const updatedSelectedAddons = selectedAddons.map((item) => {
      if (
        item.item_id === productData.item_id &&
        item.addons.addon_id === addon.addon_id
      ) {
        return {
          ...item,
          addons: {
            ...item.addons,
            addon_quantity: quantity,
          },
        };
      }
      return item;
    });

    setSelectedAddons(updatedSelectedAddons);
    localStorage.setItem("selectedAddons", JSON.stringify(updatedSelectedAddons));
  };

  const handleTouchStart = (e, addonId) => {
    touchStartX.current = e.touches[0].clientX;
    itemRefs.current[addonId].style.transition = 'none';
  };

  const handleTouchMove = (e, addonId) => {
    if (!touchStartX.current) return;
    
    touchEndX.current = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (diff > 0) {
      itemRefs.current[addonId].style.transform = `translateX(-${Math.min(diff, 80)}px`;
      setSwiping(addonId);
    }
  };

  const handleTouchEnd = (addon) => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const addonId = addon.addon_id;
    

    itemRefs.current[addonId].style.transition = 'transform 0.3s ease';
    itemRefs.current[addonId].style.transform = 'translateX(0)';
    

    if (diff > 50) {
      const selectedAddon = selectedAddons.find(
        item => item.item_id === productData.item_id && 
               item.addons.addon_id === addonId
      );
      
      if (selectedAddon && selectedAddon.addons.addon_quantity === 1) {
        handleAddonToggle(addon);
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
    setSwiping(null);
  };

  const addons = ADDONS_LIST || [];
  const selectedAddonsCount = countSelectedAddonsForProduct();
  const totalSelected = countTotalAddonsForProduct();

  return (
    <div className="delivery-addons-container">
      <div className="delivery-addons-card">
        <div 
          className="delivery-addons-header"
          onClick={toggleAddons}
        >
          <div className="delivery-addons-title">
            <h3>Добавки</h3>
            <div className="delivery-addons-status">
              {selectedAddonsCount > 0 && (
                <span className={`delivery-addons-count ${totalSelected >= MAX_ADDONS ? 'warning' : ''}`}>
                  {totalSelected}/{MAX_ADDONS}
                </span>
              )}
              <svg 
                className={`delivery-addons-chevron ${showAddons ? 'open' : ''}`} 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={`delivery-addons-content ${showAddons ? 'expanded' : ''}`}>
          {addons.length === 0 ? (
            <div className="delivery-no-addons">
              Няма налични добавки за този продукт
            </div>
          ) : (
            <ul className="delivery-addons-list">
              {addons.map((addon) => {
                if (!addon.addon_id) return null;

                const isSelected = selectedAddons.some(
                  (item) =>
                    item.item_id === productData.item_id &&
                    item.addons.addon_id === addon.addon_id
                );

                const selectedAddon = selectedAddons.find(
                  (item) =>
                    item.item_id === productData.item_id &&
                    item.addons.addon_id === addon.addon_id
                );

                return (
                  <li 
                    ref={el => itemRefs.current[addon.addon_id] = el}
                    className={`delivery-addon-item ${isSelected ? 'selected' : ''} ${swiping === addon.addon_id ? 'swiping' : ''}`}
                    key={addon.addon_id}
                    onTouchStart={(e) => handleTouchStart(e, addon.addon_id)}
                    onTouchMove={(e) => handleTouchMove(e, addon.addon_id)}
                    onTouchEnd={() => handleTouchEnd(addon)}
                  >
                    <div className="delivery-addon-info">
                      <div className="delivery-addon-name">{addon.addon_name}</div>
                      {addon.addon_short_description && (
                        <div className="delivery-addon-description">
                          {addon.addon_short_description}
                        </div>
                      )}
                    </div>
                    
                    <div className="delivery-addon-controls">
                      <div className="delivery-addon-price">+{addon.addon_price.toFixed(2)} лв.</div>
                      
                      {isSelected ? (
                        <div className="delivery-addon-quantity">
                          <button
                            className="delivery-quantity-btn minus"
                            onClick={() =>
                              handleQuantityChange(
                                addon,
                                Math.max(1, selectedAddon.addons.addon_quantity - 1)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="delivery-quantity-value">
                            {selectedAddon.addons.addon_quantity}
                          </span>
                          <button
                            className="delivery-quantity-btn plus"
                            onClick={() =>
                              handleQuantityChange(
                                addon,
                                selectedAddon.addons.addon_quantity + 1
                              )
                            }
                            disabled={totalSelected >= MAX_ADDONS}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="delivery-add-btn"
                          onClick={() => handleAddonToggle(addon)}
                          disabled={!productInCart || totalSelected >= MAX_ADDONS}
                        >
                          Добави
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <style jsx>{`
        .delivery-addons-container {
          margin: 16px 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .delivery-addons-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .delivery-addons-header {
          padding: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          transition: background 0.2s;
        }
        
        .delivery-addons-header:hover {
          background: #f8f8f8;
        }
        
        .delivery-addons-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .delivery-addons-title h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        
        .delivery-addons-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .delivery-addons-count {
          background: #00a046;
          color: white;
          font-size: 14px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .delivery-addons-count.warning {
          background: #ff3d00;
        }
        
        .delivery-addons-chevron {
          transition: transform 0.2s;
          fill: #666;
        }
        
        .delivery-addons-chevron.open {
          transform: rotate(180deg);
        }
        
        .delivery-addons-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .delivery-addons-content.expanded {
          max-height: 1000px;
        }
        
        .delivery-no-addons {
          padding: 16px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        
        .delivery-addons-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid #f0f0f0;
        }
        
        .delivery-addon-item {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          transition: transform 0.3s ease, background 0.2s;
          position: relative;
          touch-action: pan-y;
        }
        
        .delivery-addon-item.swiping {
          transition: none;
        }
        
        .delivery-addon-item:hover {
          background: #f8f8f8;
        }
        
        .delivery-addon-item.selected {
          background: #f0f8ff;
        }
        
        .delivery-addon-info {
          flex: 1;
          min-width: 0;
        }
        
        .delivery-addon-name {
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }
        
        .delivery-addon-description {
          font-size: 13px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .delivery-addon-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .delivery-addon-price {
          font-weight: 600;
          color: #333;
          white-space: nowrap;
        }
        
        .delivery-add-btn {
          background: #00a046;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .delivery-add-btn:hover {
          background: #008c3e;
        }
        
        .delivery-add-btn:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        
        .delivery-addon-quantity {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .delivery-quantity-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #ddd;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .delivery-quantity-btn:hover {
          background: #f0f0f0;
        }
        
        .delivery-quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .delivery-quantity-value {
          min-width: 20px;
          text-align: center;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ProductAddons;