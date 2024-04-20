const setItem = (key, value) => {
    try {
        const itemExists = localStorage.getItem(key) !== null;
        let isFunction = typeof value === 'function';
        value = isFunction ? value : JSON.stringify(value);

        if (itemExists) {
            console.warn(`The item ${key} already exists in localStorage but will be overwritten`);
        } else {
            console.log(`Successfully set item ${key} in the storage`);
        }
        
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Error setting item ${key} in the storage: ${error}`);
        return false;
    }
};

const removeItem = (key) => {
    try {
        const itemExists = localStorage.getItem(key) !== null;
        
        if (itemExists) {
            console.log(`Successfully removed item ${key} from the storage`);
            localStorage.removeItem(key);
            return true;
        } else {
            console.warn(`The item ${key} does not exist in storage`);
            return false;
        }
    } catch (error) {
        console.error(`Error removing item ${key} from the storage: ${error}`);
        return false;
    }
};

const getItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (item === null) {
            console.warn(`The item ${key} does not exist in storage`);
            return null;
        }

        return JSON.parse(item);
    } catch (error) {
        console.error(`Error getting item ${key} from the storage: ${error}`);
        return null;
    }
}

export {setItem,removeItem,getItem}