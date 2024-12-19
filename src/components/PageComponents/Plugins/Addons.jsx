import React, { useState, useEffect } from "react";
import '../../Styles/AddonsList.css'

const ProductAddons = ({ productData, ADDONS_LIST }) => {
  const [showAddons, setShowAddons] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Load selected addons from localStorage
  useEffect(() => {
    const savedAddons = JSON.parse(localStorage.getItem('selectedAddons')) || [];
    setSelectedAddons(savedAddons);
  }, []);

  // Toggle function to show/hide addons
  const toggleAddons = () => {
    setShowAddons(!showAddons);
  };

  // Parse addons from product data
  const addons = ADDONS_LIST || [];

  // Handle addon selection/deselection
  const handleAddonToggle = (addon) => {
    if (!addon || !addon.addon_id) return; // Add validation

    const existingProductAddon = selectedAddons.find(
      (item) => item.item_id === productData.item_id && item.addons.addon_id === addon.addon_id
    );

    let updatedSelectedAddons;

    if (existingProductAddon) {
      // If addon is already selected, we remove it from the list
      updatedSelectedAddons = selectedAddons.filter(
        (item) => item !== existingProductAddon
      );
    } else {
      // Otherwise, add the new addon with its quantity
      updatedSelectedAddons = [
        ...selectedAddons,
        {
          item_id: productData.item_id,
          addons: {
            addon_id: addon.addon_id,
            addon_name: addon.addon_name,
            addon_price: addon.addon_price,
            addon_quantity: 1, // default quantity to 1, can be changed later
          },
        },
      ];
    }

    setSelectedAddons(updatedSelectedAddons);

    // Save to localStorage
    localStorage.setItem('selectedAddons', JSON.stringify(updatedSelectedAddons));
  };

  return (
    <>
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
                <ul>
                  <li>
                    <div className="addon-container">
                      <div className="list-group">
                        <button
                          className="btn light btn-secondary w-100"
                          type="button"
                          onClick={toggleAddons}
                        >
                          <span>{showAddons ? "Скрий добавки" : "Покажи добавки"}</span>
                          <i
                            className={`bi bi-chevron-${showAddons ? "up" : "down"}`}></i>
                        </button>
                        <div
                          className={`collapse ${showAddons ? "show" : ""}`}
                          style={{ transition: "height 0.3s ease" }}
                        >
                          <div className="list-group-flush">
                            {addons.length === 0 ? (
                              <div className="alert alert-warning" role="alert">
                                Няма добавени добавки.
                              </div>
                            ) : (
                              addons.map((addon) => {
                                if (!addon.addon_id) return null; // Add validation

                                const addonDetails = ADDONS_LIST?.[addon.addon_id];
                                const isSelected = selectedAddons.some(
                                  (item) => item.item_id === productData.item_id && item.addons.addon_id === addon.addon_id
                                );

                                return (
                                  <div
                                    className="list-group-item d-flex align-items-center"
                                    key={addon.addon_id}
                                  >
                                    <div className="addon-icon me-2">
                                      {addonDetails?.addon_icon ? (
                                        <span className="icon icon-image">
                                          {addonDetails.addon_icon}
                                        </span>
                                      ) : (
                                        <span className="default-icon">➕</span>
                                      )}
                                    </div>
                                    <div className="addon-details">
                                      <span className="addon-name">
                                        {addon.addon_name}
                                      </span>
                                      <p className="addon-description">
                                        {addon.addon_short_description}
                                      </p>
                                      <p className="addon-price">
                                        Цена: {addon.addon_price.toFixed(2)} лв.
                                      </p>
                                      <p className="addon-status">
                                        Статус: {addon.addon_is_active ? "Активна" : "Неактивна"}
                                      </p>
                                    </div>
                                    <div className="addon-actions">
                                      <button
                                        className={`btn btn-${isSelected ? 'danger' : 'success'}`}
                                        onClick={() => handleAddonToggle(addon)}
                                      >
                                        {isSelected ? "Премахни" : "Добави"}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAddons;
