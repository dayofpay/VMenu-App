import { useState, useEffect } from 'react';
import "../../Styles/CartAddons.css";

// Функция за изчисляване на общата цена на добавките
const calculateTotalPrice = (addonsList) => {
    return addonsList.reduce((total, addon) => total + (addon.addon_price * addon.addon_quantity), 0);
};

const CartAddons = ({ product, handleRemoveAddon,selectedAddons }) => {
    const [addons, setAddons] = useState(getAddonsForProduct(product?.item_id));
    const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(addons)); // Добавяме състояние за общата цена

    useEffect(() => {
        const updatedAddons = getAddonsForProduct(product?.item_id);
        setAddons(updatedAddons);
        setTotalPrice(calculateTotalPrice(updatedAddons)); // Актуализираме общата цена при промяна на добавките
    }, [product]);
    useEffect(() => {
        const updatedAddons = getAddonsForProduct(product?.item_id);
        setAddons(updatedAddons);
        setTotalPrice(calculateTotalPrice(updatedAddons)); // Актуализираме общата цена при промяна на добавките
    }, [selectedAddons, product]); // Добавяме selectedAddons като зависимост
    
    // Функция за премахване на добавка


    return (
        <div>
            {addons.length > 0 && (
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
                        <strong>Обща цена: {totalPrice.toFixed(2)} лв.</strong> {/* Показваме общата цена */}
                    </div>
                </div>
            )}
        </div>
    );
};

// Функция за получаване на добавките от localStorage
const getAddonsForProduct = (productId) => {
    const selectedAddons = JSON.parse(localStorage.getItem('selectedAddons')) || [];
    const productAddons = selectedAddons.filter(addon => addon.item_id === productId);
    return productAddons.length > 0 ? productAddons.map(addon => addon.addons).flat() : [];
};

export default CartAddons;
