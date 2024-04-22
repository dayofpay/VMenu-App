const ProductHasDiscount = (timestamp) => {
    const currentTime = new Date();

    const discountTime = new Date(timestamp);
    return currentTime < discountTime
}

export {ProductHasDiscount}