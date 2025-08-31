import { useState } from 'react';

/**
 * Hook for managing discounts.
 * @returns {Object} An object with the following properties:
 *  - discount: The currently applied discount.
 *  - loading: A boolean indicating whether the hook is currently making a request.
 *  - error: An error message if the hook encountered an error.
 *  - validateDiscount: A function for validating a discount code.
 *  - applyDiscount: A function for applying a discount code.
 *  - clearDiscount: A function for clearing the currently applied discount.
 */
export const useDiscount = () => {
    const [discount, setDiscount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Validates a discount code.
     * @param {string} discountCode The discount code to validate.
     * @param {number} objectId The object id to validate the discount for.
     * @param {object} customerData An object with the customer's email and phone number.
     * @returns {Promise} A promise that resolves to the result of the validation.
     */
    const validateDiscount = async (discountCode, objectId, customerData = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/discounts/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    discount_code: discountCode,
                    object_id: objectId,
                    customer_email: customerData.email,
                    customer_phone: customerData.phone
                })
            });

            const result = await response.json();

            if (result.success) {
                setDiscount(result.discount);
                return result;
            } else {
                setError(result.error);
                return result;
            }
        } catch (err) {
            const errorMsg = 'Грешка при валидиране на отстъпка';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Applies a discount code.
     * @param {string} discountCode The discount code to apply.
     * @param {array} cartItems The items in the cart.
     * @param {number} objectId The object id to apply the discount for.
     * @param {object} customerData An object with the customer's email and phone number.
     * @returns {Promise} A promise that resolves to the result of the application.
     */
    const applyDiscount = async (discountCode, cartItems, objectId, customerData = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/discounts/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    discount_code: discountCode,
                    cart_items: cartItems,
                    object_id: objectId,
                    customer_email: customerData.email,
                    customer_phone: customerData.phone
                })
            });

            const result = await response.json();

            if (result.success) {
                setDiscount(result.discount);
                return result;
            } else {
                setError(result.error);
                return result;
            }
        } catch (err) {
            const errorMsg = 'Грешка при прилагане на отстъпка';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Clears the currently applied discount.
     *
     * This function is used to clear the currently applied discount when the
     * user removes the discount code from the input field.
     */
    const clearDiscount = () => {
        /**
         * Resets the discount and error states to their initial values.
         */
        setDiscount(null);
        setError(null);
    };

    return {
        discount,
        loading,
        error,
        validateDiscount,
        applyDiscount,
        clearDiscount
    };
};
