let exchangeRate = 0.51;

/**
 * Updates the exchange rate used for pricing calculations.
 * @param {number} rate - the new exchange rate
 */
export const setExchangeRate = (rate) => {
  // Set the exchange rate to BGN/EUR
  // This is used to calculate the value of products in euros
  // when the prices are stored in BGN
  exchangeRate = rate;
};

/**
 * Retrieves the current exchange rate used for pricing calculations.
 * 
 * This function returns the exchange rate that is currently set.
 * The exchange rate is used to convert prices from BGN (Bulgarian Lev)
 * to EUR (Euro) in various pricing calculations.
 * 
 * @returns {number} - The current exchange rate (BGN/EUR).
 */
export const getExchangeRate = () => {
  return exchangeRate;
};

/**
 * Converts a price in BGN to EUR.
 * 
 * This function takes a price in BGN as a parameter and returns
 * the equivalent price in EUR, using the current exchange rate.
 * 
 * The price in BGN is multiplied by the current exchange rate,
 * which is the number of euros that can be purchased for one
 * Bulgarian lev.  The result is then rounded to two decimal
 * places, as is typical for currency values.
 * 
 * @param {number} priceInBgn - The price in Bulgarian levs.
 * @returns {string} - The price in euros, rounded to two decimal places.
 */
export const convertToEuro = (priceInBgn) => {
  return (priceInBgn * exchangeRate).toFixed(2);
};

/**
 * Formats a price in BGN, appending the equivalent price in EUR.
 * 
 * This function takes a price in BGN as a parameter and returns
 * a string that represents the price in both BGN and EUR.
 * 
 * The price in BGN is formatted with two decimal places, as is typical
 * for currency values.  The equivalent price in EUR is computed by
 * multiplying the price in BGN by the current exchange rate, and is
 * also formatted with two decimal places.
 * 
 * The string returned by this function will be of the form
 * "BGN <price in BGN> (€<price in EUR>)", where <price in BGN>
 * is the price passed as a parameter, formatted with two decimal
 * places, and <price in EUR> is the equivalent price in EUR,
 * also formatted with two decimal places.
 * 
 * @param {number} priceInBgn - The price in Bulgarian levs.
 * @returns {string} - The price in both BGN and EUR.
 */
export const formatPrice = (priceInBgn) => {
  return `BGN ${Number(priceInBgn).toFixed(2)} (€${convertToEuro(priceInBgn)})`;
};

/**
 * Formats a discounted price, providing both the original price
 * and the discounted price.
 * 
 * This function takes two parameters: the original price of the product
 * and the discount percentage that has been applied to the product.
 * 
 * The discounted price is computed by subtracting the discount amount
 * from the original price.  The discount amount is calculated by
 * multiplying the original price by the discount percentage (which
 * is a decimal value, not a percentage value) and dividing by 100.
 * 
 * The function then returns an object with two properties: "original"
 * and "discounted".  The "original" property is a string that represents
 * the original price of the product, formatted with two decimal places,
 * in both BGN and EUR.  The "discounted" property is a string that
 * represents the discounted price of the product, also formatted with
 * two decimal places, in both BGN and EUR.
 * 
 * The strings returned by this function will be of the form
 * "BGN <price in BGN> (€<price in EUR>)", where <price in BGN>
 * is the price passed as a parameter, formatted with two decimal
 * places, and <price in EUR> is the equivalent price in EUR,
 * also formatted with two decimal places.
 * 
 * @param {number} originalPrice - The original price of the product, in BGN.
 * @param {number} discountPercentage - The discount percentage, as a decimal value.
 * @returns {object} - An object with two properties: "original" and "discounted".
 * The "original" property is the original price of the product, formatted with
 * two decimal places, in both BGN and EUR.  The "discounted" property is the
 * discounted price of the product, also formatted with two decimal places,
 * in both BGN and EUR.
 */
export const formatDiscountedPrice = (originalPrice, discountPercentage) => {
  const discountedPrice = originalPrice - (originalPrice * discountPercentage / 100);
  return {
    original: `BGN ${originalPrice.toFixed(2)} (€${convertToEuro(originalPrice)})`,
    discounted: `BGN ${discountedPrice.toFixed(2)} (€${convertToEuro(discountedPrice)})`
  };
};
