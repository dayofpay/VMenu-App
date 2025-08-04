let exchangeRate = 1.95583;

/**
 * Updates the exchange rate used for pricing calculations.
 *
 * This function is used to update the exchange rate that is used when converting
 * prices from Bulgarian levs (BGN) to euros (EUR). The exchange rate is used
 * by the `formatPrice` and `convertToEuro` functions.
 *
 * @param {number} rate - The new exchange rate (BGN to EUR). This value should
 *   be a number representing the number of euros that can be exchanged for one
 *   Bulgarian lev. For example, if one euro can be exchanged for 1.95583
 *   Bulgarian levs, the rate should be set to 1.95583.
 */
export const setExchangeRate = (rate) => {
  exchangeRate = rate;
};

/**
 * Retrieves the current exchange rate used for converting 
 * Bulgarian levs (BGN) to euros (EUR).
 *
 * This function serves as a getter for the `exchangeRate` variable,
 * which holds the value of the current exchange rate. It is crucial
 * for maintaining accurate pricing calculations across the application.
 *
 * @returns {number} - The current exchange rate from BGN to EUR.
 *   This rate is a numerical representation of how much one euro
 *   can be exchanged for in Bulgarian levs. For instance, if the
 *   exchange rate is 1.95583, it means 1 EUR is equivalent to 1.95583 BGN.
 */
export const getExchangeRate = () => {
  // Return the current value of the exchange rate.
  return exchangeRate;
};

/**
 * Converts a given price from Bulgarian levs (BGN) to euros (EUR) 
 * using a predefined exchange rate.
 *
 * This function takes a price value in BGN and converts it to EUR
 * by dividing the given price by the current exchange rate. The 
 * resulting value is then rounded to two decimal places to ensure 
 * precision in financial calculations.
 *
 * @param {number} priceInBgn - The price in Bulgarian levs that 
 *   needs to be converted to euros.
 * 
 * @returns {string} - The equivalent price in euros as a string, 
 *   rounded to two decimal places for accuracy. This representation 
 *   is suitable for display purposes where financial precision is 
 *   required.
 */
export const convertToEuro = (priceInBgn) => {
  // Divide the price in BGN by the exchange rate to get the price in EUR
  const priceInEuro = priceInBgn / exchangeRate;

  // Round the result to two decimal places to ensure financial precision
  return priceInEuro.toFixed(2);
};

/**
 * Formats a price in BGN, appending the equivalent price in EUR.
 *
 * This function takes a price in Bulgarian levs (BGN) and formats it into a
 * string that includes both the BGN and EUR values. The BGN value is rounded
 * to two decimal places, and the EUR value is calculated by dividing the BGN
 * value by the current exchange rate (which is set with the `setExchangeRate`
 * function). The EUR value is also rounded to two decimal places.
 *
 * The returned string is in the format "BGN x.xx (€y.yy)", where x.xx is the
 * price in BGN and y.yy is the equivalent price in EUR.
 *
 * @param {number} priceInBgn - The price in Bulgarian levs.
 * @returns {string} - The price in both BGN and EUR.
 */
export const formatPrice = (priceInBgn) => {
  // Round the BGN price to two decimal places
  const bgnPrice = Number(priceInBgn).toFixed(2);

  // Calculate the EUR price by dividing the BGN price by the exchange rate
  const eurPrice = convertToEuro(priceInBgn);

  // Return the formatted string
  return `BGN ${bgnPrice} (€${eurPrice})`;
};

/**
 * Formats a discounted price, providing both the original and discounted values.
 * 
 * This function takes two parameters: the original price of an item in BGN, and
 * the discount percentage that should be applied to that price. The function
 * calculates the discounted price by first calculating the discount amount (the
 * percentage of the original price that should be subtracted), and then
 * subtracting that amount from the original price.
 * 
 * The function then returns an object with two properties: `original` and
 * `discounted`. The `original` property is a string that represents the
 * original price in both BGN and EUR, rounded to two decimal places. The
 * `discounted` property is a string that represents the discounted price in
 * both BGN and EUR, rounded to two decimal places.
 * 
 * @param {number} originalPrice - The original price in BGN.
 * @param {number} discountPercentage - The discount percentage (as a number, e.g. 20).
 * @returns {object} - Object with formatted original and discounted prices.
 */
export const formatDiscountedPrice = (originalPrice, discountPercentage) => {
  // Calculate the discount amount (the percentage of the original price that should be subtracted)
  const discountAmount = originalPrice * discountPercentage / 100;

  // Calculate the discounted price by subtracting the discount amount from the original price
  const discountedPrice = originalPrice - discountAmount;

  // Return an object with the original and discounted prices, formatted as strings
  return {
    // The original price in both BGN and EUR, rounded to two decimal places
    original: `BGN ${originalPrice.toFixed(2)} (€${convertToEuro(originalPrice).toFixed(2)})`,
    // The discounted price in both BGN and EUR, rounded to two decimal places
    discounted: `BGN ${discountedPrice.toFixed(2)} (€${convertToEuro(discountedPrice).toFixed(2)})`
  };
};
