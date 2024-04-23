const ProductHasDiscount = (timestamp) => {
    const currentTime = new Date();

    const discountTime = new Date(timestamp);
    return currentTime < discountTime
}

const TimeBetween = (dateOne, dateTwo) => {
    const DATE_OBJ1 = new Date(dateOne);
    const DATE_OBJ2 = new Date(dateTwo);

    const TIME_DIFFERENCE = DATE_OBJ2.getTime() - DATE_OBJ1.getTime();
    const DAY_DIFFERENCE = Math.round(TIME_DIFFERENCE / (1000 * 3600 * 24));

    if (DAY_DIFFERENCE === 0) {
        return 'Качено днес';
    } else if (DAY_DIFFERENCE === 1) {
        return 'Качено вчера';
    } else if (DAY_DIFFERENCE < 7) {
        return `Качено преди ${DAY_DIFFERENCE} дни`;
    } else {
        return DATE_OBJ1.toLocaleDateString();
    }
}

export {ProductHasDiscount,TimeBetween}