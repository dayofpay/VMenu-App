import React, { useState, useEffect } from "react";
import "../../Styles/AddonsList.css";
import { do_action } from "../../../services/userServices";

const ProductAddons = ({ productData, ADDONS_LIST,productInCart }) => {
  const [showAddons, setShowAddons] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    const savedAddons = JSON.parse(localStorage.getItem("selectedAddons")) || [];
    setSelectedAddons(savedAddons);
    
  }, [productData]);

  const toggleAddons = () => {
    setShowAddons(!showAddons);
    const button_name = showAddons ? "Покажи добавки" : "Скрий добавки";
    do_action("click_button",{button_name:button_name});
  }
  /**
   * Handles the toggle of a specific addon for the product
   * @param {Object} addon The addon object to toggle
   */
  const handleAddonToggle = (addon) => {
    if (!addon || !addon.addon_id) return;
    /**
     * Find the existing addon for the product in the selectedAddons array
     * by comparing the addon id and the product id
     */
    const existingProductAddon = selectedAddons.find(
      (item) =>
        item.item_id === productData.item_id &&
        item.addons.addon_id === addon.addon_id
    );

    /**
     * If the addon is already in the selectedAddons array, remove it
     * otherwise, add it to the array
     */
    let updatedSelectedAddons;

    if (existingProductAddon) {
      do_action("remove_addon", { addon_name: addon.addon_name });

      /**
       * Remove the existing addon from the selectedAddons array
       * by filtering out the existing addon
       */
      updatedSelectedAddons = selectedAddons.filter(
        (item) => item !== existingProductAddon
      );
    } else {
      /**
       * Add the addon to the selectedAddons array
       * by creating a new object with the product id, addon id, name, price and quantity
       * and adding it to the array
       */
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

    /**
     * Update the selectedAddons state and local storage with the new array
     */
    setSelectedAddons(updatedSelectedAddons);
    do_action("add_addon", {addon_name: addon.addon_name});
    localStorage.setItem("selectedAddons", JSON.stringify(updatedSelectedAddons));
  };

  /**
   * Handles the change of the quantity of a specific addon for the product
   * @param {Object} addon The addon object to update
   * @param {Number} quantity The new quantity of the addon
   */
  const handleQuantityChange = (addon, quantity) => {

    /**
     * Create a new array of selectedAddons, mapping over the existing array
     * and updating the addon quantity of the specific addon that is being updated
     */
    const updatedSelectedAddons = selectedAddons.map((item) => {
      /**
       * Check if the current item in the array is the one that needs to be updated
       * by comparing the item id and the addon id
       */
      if (
        item.item_id === productData.item_id &&
        item.addons.addon_id === addon.addon_id
      ) {

        /**
         * If the item is the one that needs to be updated, return a new object
         * with the updated addon quantity
         */
        return {
          ...item,
          addons: {
            ...item.addons,
            addon_quantity: quantity,
          },
        };
      }

      /**
       * If the item is not the one that needs to be updated, return it as is
       */
      return item;
    });

    /**
     * Update the selectedAddons state and local storage with the new array
     */
    setSelectedAddons(updatedSelectedAddons);
    localStorage.setItem("selectedAddons", JSON.stringify(updatedSelectedAddons));
  };

  const addons = ADDONS_LIST || [];

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">
              Добавки към продукта: <strong>{productData?.item_name || "Неизвестен продукт"}</strong>
            </h5>
          </div>
          <div className="card-body py-2">
            <div className="addons-list">
              <button className="btn light btn-secondary w-100" type='button' onClick={toggleAddons}>
              <span>{!showAddons ? 'Покажи добавки' : 'Скрий добавки'}</span>
              <i className={`bi bi-chevron-${toggleAddons ? 'up' : 'down' }`}></i>
            </button>
              {showAddons && (
                <div className="list-group-flush">
                  {addons.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                      Няма добавени добавки.
                    </div>
                  ) : (
                    addons.map((addon) => {
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
                        <div
                          className="list-group-item d-flex align-items-center"
                          key={addon.addon_id}
                        >
                          <div className="addon-details flex-grow-1">
                            <span className="addon-name">{addon.addon_name}</span>
                            <p className="addon-description">
                              {addon.addon_short_description}
                            </p>
                            <p className="addon-price">
                              Цена: {addon.addon_price.toFixed(2)} лв.
                            </p>
                          </div>
                          {isSelected ? (
                            <div className="addon-quantity d-flex align-items-center">
                              <button
                                className="btn btn-sm btn-secondary"
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    addon,
                                    Math.max(1, selectedAddon.addons.addon_quantity - 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="mx-2">
                                {selectedAddon.addons.addon_quantity}
                              </span>
                              <button
                                className="btn btn-sm btn-secondary"
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    addon,
                                    selectedAddon.addons.addon_quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                              <button
                                className="btn btn-danger btn-sm ms-3"
                                type="button"
                                onClick={() => handleAddonToggle(addon)}
                              >
                                Премахни
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleAddonToggle(addon)}
                              disabled={!productInCart}
                            >
                              Добави
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddons;
