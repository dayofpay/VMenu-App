let exchangeRates = {
  BGN: 1,        // 1 BGN = 1 BGN
  EUR: 1.95583,  // 1 EUR = 1.95583 BGN
  USD: 1.77,     // 1 USD ≈ 1.77 BGN
  GBP: 2.28,     // 1 GBP ≈ 2.28 BGN
  RON: 0.39,     // 1 RON ≈ 0.39 BGN
  TRY: 0.04094   // 1 TRY = 0.04094 BGN

};


/**
 * Updates the exchange rates with the given rates.
 * @param {Object} rates - An object containing currency codes as keys and their exchange rates as values.
 */
export const setExchangeRates = (rates) => {
  // Merge the existing exchange rates with the new rates
  exchangeRates = { ...exchangeRates, ...rates };
};

/**
 * Returns the exchange rate for the given currency.
 * If the currency is not found, returns 1 (no conversion).
 * @param {string} currency - The currency code.
 * @returns {number} The exchange rate.
 */
export const getExchangeRate = (currency) => {
  return exchangeRates[currency] || 1;
};

/**
 * Converts a price from one currency to another using predefined exchange rates.
 * @param {number} price - The amount of money to convert.
 * @param {string} fromCurrency - The currency code of the original price.
 * @param {string} toCurrency - The currency code to convert the price to.
 * @returns {number} The converted price in the target currency.
 */
export const convertPrice = (price, fromCurrency, toCurrency) => {
  // If both currencies are the same, return the original price
  if (fromCurrency === toCurrency) return price;
  
  // Convert the price to BGN as a base currency
  const priceInBGN = price * getExchangeRate(fromCurrency);
  
  // Convert the BGN price to the target currency
  const convertedPrice = priceInBGN / getExchangeRate(toCurrency);
  
  return convertedPrice;
};

/**
 * Formats the price with the specified currency and optionally adds a secondary currency conversion.
 * @param {number} price - The amount of money to format.
 * @param {string} currency - The currency code to display.
 * @param {boolean} [showSecondary=true] - Whether to show the secondary currency conversion for BGN.
 * @returns {string} The formatted price string.
 */
export const formatPrice = (price, currency, showSecondary = true) => {
  // Format the primary price with the specified currency
  const formattedPrice = `${currency} ${Number(price).toFixed(2)}`;
  
  // If the currency is BGN and secondary display is enabled, show conversion to EUR
  if (currency === 'BGN' && showSecondary) {
    const priceInEUR = convertPrice(price, 'BGN', 'EUR').toFixed(2);
    return `${formattedPrice} (€${priceInEUR})`;
  }
  
  // Return the formatted price without secondary conversion
  return formattedPrice;
};

/**
 * Formats the original and discounted prices with the specified currency.
 * @param {number} originalPrice - The original price before discount.
 * @param {number} discountPercentage - The percentage of the discount.
 * @param {string} currency - The currency code to display.
 * @returns {object} An object containing the formatted original and discounted prices.
 */
export const formatDiscountedPrice = (originalPrice, discountPercentage, currency) => {
  // Calculate the discount amount
  const discountAmount = originalPrice * discountPercentage / 100;

  // Calculate the discounted price
  const discountedPrice = originalPrice - discountAmount;

  // Return an object with the formatted prices
  return {
    original: formatPrice(originalPrice, currency),
    discounted: formatPrice(discountedPrice, currency)
  };
};

/**
 * Calculates the discounted price and returns both the original and discounted
 * prices formatted with the specified currency.
 * @param {number} price - The original price before discount.
 * @param {number} discountPercentage - The discount percentage to apply.
 * @param {string} currency - The currency code for formatting prices.
 * @returns {object} An object containing the original price, discounted price,
 * and their formatted representations.
 */
export const calculateDiscountedPrice = (price, discountPercentage, currency) => {
  // Calculate the discounted price
  const discountedPrice = price - (price * discountPercentage / 100);
  
  // Return an object with the original, discounted, and formatted price details
  return {
    original: price,
    discounted: discountedPrice,
    formatted: formatPrice(discountedPrice, currency),
    formattedWithOriginal: `${formatPrice(price, currency, false)} → ${formatPrice(discountedPrice, currency)}`
  };
};
