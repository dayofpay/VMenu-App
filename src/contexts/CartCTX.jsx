import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as storage from '../utils/memory';
import { CheckoutKeys } from "../keys/formKeys";
import { getEnv } from "../utils/appData";
import { emitVMenuEvent } from '../components/Experience/vmenuDevApi';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [objectData, setObjectData] = useState(null);
    
    
    useEffect(() => {
        const loadObjectData = () => {
            try {
                const storedData = storage.getItem('objectData');
                console.log('CartProvider - stored objectData:', storedData);
                
                if (storedData) {
                    setObjectData(storedData);
                } else {
                    
                    const sessionData = sessionStorage.getItem('objectData');
                    if (sessionData) {
                        try {
                            const parsed = JSON.parse(sessionData);
                            setObjectData(parsed);
                        } catch (e) {
                            console.warn('Failed to parse session objectData');
                        }
                    }
                }
            } catch (error) {
                console.warn('Error loading objectData from storage:', error);
            }
        };
        
        loadObjectData();
        
        
        const handleStorageChange = () => {
            loadObjectData();
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const cartUpdateHandler = (data, setProductExists, trackingData = {}) => {
        let itemAdded = false;
        const createCart = () => {
            storage.setItem('cart', [data]);
            itemAdded = true;
        };
        const updateCart = (cartObj) => {
            const productExists = cartObj.some((product) => product?.productId === data.productId);
            if (!productExists) {
                storage.setItem('cart', [...cartObj, data]);
                itemAdded = true;
            }
        };
        setProductExists(true);
        const cartObj = storage.getItem('cart');
        cartObj === null ? createCart() : updateCart(cartObj);
        if (itemAdded) {
            const quantity = Math.max(1, Number(data.productQuantity || trackingData.quantity || 1));
            const detail = {
                contentId: data.productId,
                contentName: String(trackingData.contentName || ''),
                category: String(trackingData.category || ''),
                quantity,
                value: Number(trackingData.value || 0),
                currency: String(trackingData.currency || ''),
            };
            emitVMenuEvent('cart.item_added', detail);
            emitVMenuEvent('AddToCart', detail);
        }
    };

    const cartDeleteHandler = (data, setProductExists) => {
        let cart = storage.getItem('cart');
        const indexToDelete = cart.findIndex(item => item.productId === data.productId);
    
        if (indexToDelete !== -1) {
            cart.splice(indexToDelete, 1);
            storage.setItem('cart', cart);
            setProductExists(false);
            
            const savedAddons = JSON.parse(localStorage.getItem('selectedAddons')) || [];
            const updatedAddons = savedAddons.filter(addon => addon.item_id !== data.productId);
            localStorage.setItem("selectedAddons", JSON.stringify(updatedAddons));
        }
    };

const checkoutHandler = async (formData) => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedAddons = JSON.parse(localStorage.getItem('selectedAddons')) || [];
    const appliedDiscount = JSON.parse(localStorage.getItem('appliedDiscount')) || null;

    if (cart.length === 0) {
      throw new Error('Количката е празна');
    }

    
    const paymentMethod = formData[CheckoutKeys?.CHECKOUT_PAYMENT] || formData.checkoutPayment || 'CASH';
    const tableId = storage.getItem('tableId') || 0;
    
    let objectId = storage.getItem('restaurantId');
    if (!objectId) {
      const pathParts = window.location.pathname.split('/');
      objectId = pathParts.find(part => part.length > 5);
    }

    if (!objectId) {
      throw new Error('Не може да се определи ID на обекта');
    }

    
    if (paymentMethod === 'CASH') {
      console.log('CASH payment - creating order immediately');
      
      const response = await fetch(getEnv() + '/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objectData: { object_id: objectId, table_ID: tableId },
          customerData: {
            checkoutName: formData[CheckoutKeys?.CHECKOUT_NAME] || '',
            checkoutEmail: formData[CheckoutKeys?.CHECKOUT_EMAIL] || '',
            checkoutPhone: formData[CheckoutKeys?.CHECKOUT_PHONE] || '',
            checkoutPayment: 'CASH',
            checkoutComment: formData[CheckoutKeys?.CHECKOUT_COMMENT] || '',
          },
          cartData: cart,
          item_addons: selectedAddons,
          discountData: appliedDiscount,
        }),
      });

      if (!response.ok) throw new Error('Грешка при създаване на поръчка');
      
      const data = await response.json();
      const products = Array.isArray(objectData?.allProducts) ? objectData.allProducts : [];
      const productValue = cart.reduce((total, item) => {
        const product = products.find((candidate) => String(candidate.item_id) === String(item.productId));
        if (!product) return total;
        const price = Number(product.item_price || 0);
        const discount = Number(product.discount_percentage || 0);
        const finalPrice = discount > 0 ? price * (100 - discount) / 100 : price;
        return total + finalPrice * Math.max(1, Number(item.productQuantity || 1));
      }, 0);
      const addonsValue = selectedAddons.reduce((total, addon) => total + Number(addon?.addons?.addon_price || 0) * Math.max(1, Number(addon?.addons?.addon_quantity || 1)), 0);
      const purchaseEvent = {
        orderId: data.orderId,
        objectId: Number(objectId),
        paymentMethod: 'CASH',
        value: Math.max(0, productValue + addonsValue - Number(appliedDiscount?.amount || 0)),
        currency: objectData?.objectInformation?.object_currency || products[0]?.item_currency || 'EUR',
        contentIds: cart.map((item) => item.productId).filter((item) => item != null),
        numItems: cart.reduce((total, item) => total + Math.max(1, Number(item.productQuantity || 1)), 0),
        source: 'digital_menu',
        completedAt: new Date().toISOString(),
      };
      emitVMenuEvent('order.created', purchaseEvent);
      emitVMenuEvent('purchase.completed', purchaseEvent);
      emitVMenuEvent('PurchaseEvent', purchaseEvent);
      
      
      localStorage.removeItem('cart');
      localStorage.removeItem('selectedAddons');
      localStorage.removeItem('appliedDiscount');
      
      return { 
        type: 'CASH', 
        success: true, 
        orderId: data.orderId,
        message: data.message 
      };
    }
    
    
    else if (paymentMethod === 'CARD') {
      console.log('CARD payment - preparing payment intent');
      
      
      const cartTotal = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      
      const addonsTotal = selectedAddons.reduce((total, addon) => {
        return total + (addon.addons.addon_price * addon.addons.addon_quantity);
      }, 0);
      
      const totalAmount = cartTotal + addonsTotal - (appliedDiscount?.amount || 0);
      
      return {
        type: 'CARD',
        requiresPayment: true,
        paymentData: {
          objectId,
          amount: totalAmount,
          currency: objectData?.objectInformation?.object_currency || 'EUR',
          customerData: {
            checkoutName: formData[CheckoutKeys?.CHECKOUT_NAME] || '',
            checkoutEmail: formData[CheckoutKeys?.CHECKOUT_EMAIL] || '',
            checkoutPhone: formData[CheckoutKeys?.CHECKOUT_PHONE] || '',
            checkoutComment: formData[CheckoutKeys?.CHECKOUT_COMMENT] || '',
            checkoutPayment: 'CARD',
          },
          cartData: cart,
          item_addons: selectedAddons,
          discountData: appliedDiscount,
        }
      };
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

    const logValues = {
        cartUpdateHandler,
        cartDeleteHandler,
        checkoutHandler,
        objectData, 
    };

    return (
        <CartContext.Provider value={logValues}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

CartContext.displayName = 'CartContext';
export default CartContext;
