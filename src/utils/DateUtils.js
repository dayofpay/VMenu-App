const ProductHasDiscount = (timestamp) => {
    const currentTime = new Date();

    const discountTime = new Date(timestamp);
    return currentTime < discountTime
}

const TimeBetween = (dateOne, dateTwo) => {
    const DAY_MS = 1000 * 60 * 60 * 24;
    const timeDifference = Date.parse(dateTwo) - Date.parse(dateOne);
    const dayDifference = Math.floor(timeDifference / DAY_MS);

    if (dayDifference === 0) return 'Качено днес';
    if (dayDifference === 1) return 'Качено вчера';
    if (dayDifference < 7) return `Качено преди ${dayDifference} дни`;

    return new Date(dateOne).toLocaleDateString();
}

export {ProductHasDiscount,TimeBetween}