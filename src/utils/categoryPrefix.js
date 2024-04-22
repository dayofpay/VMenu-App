const GeneratePrefix = (itemCount) => {
    if(itemCount === 0){
        return 'Продукта'
    }

    if(itemCount === 1){
        return 'Продукт'
    }

    if(itemCount > 1){
        return 'Продукти'
    }

}

export default GeneratePrefix