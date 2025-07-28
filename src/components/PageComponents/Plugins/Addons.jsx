import React, { useState, useEffect } from "react";
import "../../Styles/AddonsList.css";
import { do_action } from "../../../services/userServices";

const ProductAddons = ({ productData, ADDONS_LIST, productInCart }) => {
  const [showAddons, setShowAddons] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const MAX_ADDONS = productData?.settings?.MODIFIERS?.MAX_ADDONS || 5;

  useEffect(() => {
    const savedAddons =
      JSON.parse(localStorage.getItem("selectedAddons")) || [];
    setSelectedAddons(savedAddons);
  }, [productData]);

  const countSelectedAddonsForProduct = () => {
    return selectedAddons.filter((item) => item.item_id === productData.item_id)
      .length;
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
      if (totalAddons >= MAX_ADDONS) {
        // todo: warning message implementation
        return;
      }

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
    localStorage.setItem(
      "selectedAddons",
      JSON.stringify(updatedSelectedAddons)
    );
  };

  const handleQuantityChange = (addon, quantity) => {
    const currentTotal = countTotalAddonsForProduct();
    const currentQuantity =
      selectedAddons.find(
        (item) =>
          item.item_id === productData.item_id &&
          item.addons.addon_id === addon.addon_id
      )?.addons.addon_quantity || 0;

    // Проверка дали новото количество ще надвиши лимита
    if (currentTotal - currentQuantity + quantity > MAX_ADDONS) {
      // todo: warning message implementation
      return;
    }

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
    localStorage.setItem(
      "selectedAddons",
      JSON.stringify(updatedSelectedAddons)
    );
  };

  const addons = ADDONS_LIST || [];
  const selectedAddonsCount = countSelectedAddonsForProduct();

  return (
    <div className="row">
      <style jsx>{`
        .addon-card {
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 20px;
          overflow: hidden;
        }
        .addon-card-header {
          background-color: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }
        .addon-card-title {
          font-size: 1.1rem;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .addon-badge {
          font-size: 0.8rem;
          padding: 5px 10px;
          background-color: #4e73df;
        }
        .addon-list-item {
          padding: 15px;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s;
        }
        .addon-list-item:hover {
          background-color: #f9f9f9;
        }
        .addon-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        .addon-description {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 5px;
        }
        .addon-price {
          font-weight: 600;
          color: #2e59d9;
          margin-bottom: 0;
        }
        .toggle-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .addon-quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .quantity-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .addon-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .no-addons-alert {
          margin: 15px;
          text-align: center;
        }
      `}</style>

      <div className="col-12">
        <div className="addon-card">
          <div className="addon-card-header d-flex align-items-center justify-content-between">
            <div
              className="addon-title-container"
              style={{
                flex: 1,
                minWidth: 0,
                marginRight: "10px",
              }}
            >
              <h5
                className="addon-card-title m-0"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Добавки:{" "}
                <strong>
                  {productData?.item_name || "Неизвестен продукт"}
                </strong>
              </h5>
            </div>
            {selectedAddonsCount > 0 && (
              <span
                className={
                  countTotalAddonsForProduct() >= MAX_ADDONS
                    ? "badge bg-danger flex-shrink-0"
                    : "badge bg-success flex-shrink-0"
                }
                style={{ minWidth: "fit-content" }}
              >
                {countTotalAddonsForProduct()}/{MAX_ADDONS} добавки
              </span>
            )}
          </div>
          <div className="card-body py-2">
            <div className="addons-list">
              <button
                className="btn btn-light toggle-btn"
                type="button"
                onClick={toggleAddons}
              >
                <span>{!showAddons ? "Покажи добавки" : "Скрий добавки"}</span>
                <i
                  className={`bi bi-chevron-${showAddons ? "up" : "down"}`}
                ></i>
              </button>

              {showAddons && (
                <div className="list-group-flush">
                  {addons.length === 0 ? (
                    <div
                      className="alert alert-warning no-addons-alert"
                      role="alert"
                    >
                      Няма налични добавки за този продукт.
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
                          className="list-group-item addon-list-item d-flex align-items-center"
                          key={addon.addon_id}
                        >
                          <div className="addon-details flex-grow-1">
                            <span className="addon-name">
                              {addon.addon_name}
                            </span>
                            {addon.addon_short_description && (
                              <p className="addon-description">
                                {addon.addon_short_description}
                              </p>
                            )}
                            <p className="addon-price">
                              +{addon.addon_price.toFixed(2)} лв.
                            </p>
                          </div>

                          <div className="addon-actions">
                            {isSelected ? (
                              <>
                                <div className="addon-quantity-controls">
                                  <button
                                    className="btn btn-sm btn-secondary quantity-btn"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        addon,
                                        Math.max(
                                          1,
                                          selectedAddon.addons.addon_quantity -
                                            1
                                        )
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span>
                                    {selectedAddon.addons.addon_quantity}
                                  </span>
                                  <button
                                    className="btn btn-sm btn-secondary quantity-btn"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        addon,
                                        selectedAddon.addons.addon_quantity + 1
                                      )
                                    }
                                    disabled={
                                      countTotalAddonsForProduct() >= MAX_ADDONS
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  className="btn btn-danger btn-sm"
                                  type="button"
                                  onClick={() => handleAddonToggle(addon)}
                                >
                                  Премахни
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleAddonToggle(addon)}
                                disabled={
                                  !productInCart ||
                                  selectedAddonsCount >= MAX_ADDONS
                                }
                              >
                                Добави
                              </button>
                            )}
                          </div>
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
