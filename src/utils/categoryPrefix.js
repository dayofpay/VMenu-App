const GeneratePrefix = itemCount => ['Продукта', 'Продукт', 'Продукти'][Math.min(itemCount, 2)];

export default GeneratePrefix