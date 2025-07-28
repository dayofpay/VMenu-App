const GeneratePrefix = itemCount => [' Продукта', ' Продукт', ' Продукта'][Math.min(itemCount, 2)];

export default GeneratePrefix