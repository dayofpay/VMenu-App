/**
 * Checks if a product has a discount that is still valid.
 * @param {string} timestamp - The timestamp of when the discount ends.
 * @returns {boolean} True if the discount is still valid, false otherwise.
 */
const ProductHasDiscount = (timestamp) => {
    /**
     * The current time in milliseconds.
     * @type {Date}
     */
    const currentTime = new Date();

    /**
     * The timestamp of when the discount ends.
     * @type {Date}
     */
    const discountTime = new Date(timestamp);

    /**
     * True if the current time is before the discount time, false otherwise.
     * @type {boolean}
     */
    return currentTime < discountTime;
}


/**
 * Calculates the time difference between two dates and returns a string indicating
 * how long ago the first date was. The returned string is in Bulgarian.
 * @param {string} dateOne - The first date.
 * @param {string} dateTwo - The second date.
 * @returns {string} A string indicating how long ago the first date was.
 */
const TimeBetween = (dateOne, dateTwo) => {
    /**
     * The number of milliseconds in a day.
     * @type {number}
     */
    const DAY_MS = 1000 * 60 * 60 * 24;

    /**
     * The difference in milliseconds between the two dates.
     * @type {number}
     */
    const timeDifference = Date.parse(dateTwo) - Date.parse(dateOne);

    /**
     * The difference between the two dates in days.
     * @type {number}
     */
    const dayDifference = Math.floor(timeDifference / DAY_MS);

    /**
     * If the difference is zero, return "Uploaded today" in Bulgarian.
     */
    if (dayDifference === 0) return 'Качено днес';

    /**
     * If the difference is one, return "Uploaded yesterday" in Bulgarian.
     */
    if (dayDifference === 1) return 'Качено вчера';

    /**
     * If the difference is less than seven, return "Uploaded X days ago" in Bulgarian.
     */
    if (dayDifference < 7) return `     ${dayDifference}     `;

    /**
     * Otherwise, return the first date in Bulgarian.
     */
    return new Date(dateOne).toLocaleDateString('bg-BG');
}

export {ProductHasDiscount,TimeBetween}