
/**
 * Checks whether the current browser supports the vibration API.
 * 
 * The vibration API is an extension of the HTML5 Vibration API that allows web developers to access the vibrate functionality of the device.
 * 
 * @returns {Boolean} true if the browser supports the vibration API, false otherwise.
 */
const supportsVibration = () => {
  return 'vibrate' in navigator; // checks whether the navigator object has a "vibrate" property
};

/**
 * Triggers the device to vibrate.
 * 
 * The vibration API is an extension of the HTML5 Vibration API that allows web developers to access the vibrate functionality of the device.
 * 
 * @param {Number|Array} pattern - The pattern with which the device should vibrate. If a number is provided, it will be used to vibrate the device for the specified number of milliseconds. If an array is provided, the device will vibrate according to the pattern provided. For example, the pattern [500, 300, 500] would cause the device to vibrate for 500 milliseconds, wait 300 milliseconds, and then vibrate for 500 milliseconds again.
 * 
 */
const triggerVibration = (pattern = 50) => {
  if (supportsVibration()) {
    // The navigator object has a "vibrate" property, so we can use the vibration API.
    // The "vibrate" property is a function that takes a pattern as an argument. The pattern is the instruction for how the device should vibrate.
    // The pattern can either be a number (which causes the device to vibrate for the specified number of milliseconds) or an array (which causes the device to vibrate according to the pattern provided).
    navigator.vibrate(pattern);
  }
};
