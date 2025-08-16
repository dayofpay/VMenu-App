/**
 * This function takes a string and a set of values and replaces all occurrences of placeholders in the string with the corresponding values.
 * 
 * @param {string} str - The string that contains placeholders in the form of curly braces `{}`.
 * @param {object} values - An object that contains key-value pairs where the keys are the placeholders without the curly braces `{}` and the values are the replacement values.
 * @returns {string} - The string with all placeholders replaced by the corresponding values.
 */
export const interpolateString = (str, values) => {
  // The `replace` method takes a regular expression and a callback function. The regular expression `/{(\w+)}/g` matches any substring that starts with `{` followed by one or more word characters (`\w+`), and ends with `}`. The `g` flag makes the regular expression global, so it matches all occurrences in the string.
  // The callback function takes two arguments: `match` and `key`. The `match` argument is the entire matched substring, and the `key` argument is the value of the placeholder inside the curly braces.
  // Inside the callback function, we use the `values` object to look up the value for the given `key`. If the `key` is found in the `values` object, we return the corresponding value. Otherwise, we return the `match` argument as is, which means we leave the placeholder unchanged.
  return str.replace(/{(\w+)}/g, (match, key) => {
    // If the `key` is found in the `values` object, we return the corresponding value. Otherwise, we return the `match` argument as is, which means we leave the placeholder unchanged.
    return values[key] !== undefined ? values[key] : match;
  });
};
