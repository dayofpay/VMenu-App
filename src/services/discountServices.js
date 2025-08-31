import { post } from "../lib/request";
import { getEnv } from "../utils/appData";
export const discountService = {
  /**
   * Validates a discount code for a given object id and customer data.
   * @param {string} discountCode The discount code to validate.
   * @param {number} objectId The object id to validate the discount for.
   * @param {string} [customerEmail=null] The customer's email.
   * @param {string} [customerPhone=null] The customer's phone number.
   * @returns {Promise} A promise that resolves to the result of the validation.
   */
  validateDiscount: async (discountCode, objectId, customerEmail = null, customerPhone = null) => {
    try {
      const response = await post(getEnv() + '/discounts/validate', {
        discount_code: discountCode,
        object_id: objectId,
        customer_email: customerEmail,
        customer_phone: customerPhone
      });
      
      return response.data;
    } catch (error) {
      console.error('Error validating discount:', error);
      throw error;
    }
  },


  /**
   * Applies a discount code for a given object id and customer data.
   * @param {string} discountCode The discount code to apply.
   * @param {array} cartItems The items in the cart.
   * @param {number} objectId The object id to apply the discount for.
   * @param {string} [customerEmail=null] The customer's email.
   * @param {string} [customerPhone=null] The customer's phone number.
   * @returns {Promise} A promise that resolves to the result of the application.
   */
  applyDiscount: async (discountCode, cartItems, objectId, customerEmail = null, customerPhone = null) => {
    try {
      const response = await post(getEnv() + '/discounts/apply', {
        discount_code: discountCode,
        cart_items: cartItems,
        object_id: objectId,
        customer_email: customerEmail,
        customer_phone: customerPhone
      });

      // Return the response data
      return response.data;
    } catch (error) {
      // Log the error
      console.error('Error applying discount:', error);
      // Re-throw the error
      throw error;
    }
  }
};