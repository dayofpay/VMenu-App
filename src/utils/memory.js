/**
 * A function to set a value in local storage under a specified key
 *
 * @param {string} key The key to store the value under in local storage
 * @param {*} value The value to store in local storage. If the value is a
 * function, it will be called with the current state and the result will be
 * stored in local storage instead.
 *
 * @returns {boolean} true if the item was successfully set, false otherwise
 */
const setItem = (key, value) => {
    try {
        /**
         * Check if the item already exists in local storage
         */
        const itemExists = localStorage.getItem(key) !== null;

        /**
         * If the value is a function, call it with the current state and assign
         * the result to the value variable. This allows the hook to be used
         * with functions that take the current state and return a new value.
         */
        let isFunction = typeof value === 'function';
        value = isFunction ? value : JSON.stringify(value);

        /**
         * If the item already exists in local storage, log a warning message.
         * If the item does not exist, log a success message.
         */
        if (itemExists) {
            console.warn(`The item ${key} already exists in localStorage but will be overwritten`);
        } else {
            console.log(`Successfully set item ${key} in the storage`);
        }
        
        /**
         * Store the serialized value in local storage under the specified key
         */
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        /**
         * If an error occurs, log an error message and return false
         */
        console.error(`Error setting item ${key} in the storage: ${error}`);
        return false;
    }
};

const removeItem = (key) => {
    try {
        // Check if the item exists in local storage by trying to retrieve it
        const itemExists = localStorage.getItem(key) !== null;
        
        if (itemExists) {
            // Log a message indicating the item will be removed
            console.log(`Successfully removed item ${key} from the storage`);
            
            // Remove the item from local storage
            localStorage.removeItem(key);
            
            // Return true to indicate the item was successfully removed
            return true;
        } else {
            // If the item does not exist, log a warning message
            console.warn(`The item ${key} does not exist in storage`);
            
            // Return false to indicate no item was removed
            return false;
        }
    } catch (error) {
        // Log an error message if there was a problem during the removal process
        console.error(`Error removing item ${key} from the storage: ${error}`);
        
        // Return false to indicate the removal was unsuccessful due to an error
        return false;
    }
};

/**
 * A function to retrieve an item from local storage by its key
 *
 * @param {string} key The key of the item to retrieve from local storage
 * @returns {Array|Object} The parsed JSON value of the item from local storage, or an empty array if the item does not exist or an error occurs
 */
const getItem = (key) => {
    try {
        // Attempt to retrieve the item from local storage using the provided key
        const item = localStorage.getItem(key);

        // Check if the item exists; if not, log a warning and return an empty array
        if (item === null) {
            console.warn(`The item ${key} does not exist in storage`);
            return [];
        }

        // Parse the JSON string stored in local storage and return the result
        return JSON.parse(item);
    } catch (error) {
        // Log an error message if an exception occurs during retrieval or parsing
        console.error(`Error getting item ${key} from the storage: ${error}`);

        // Return an empty array if an error occurs
        return [];
    }
}

export {setItem,removeItem,getItem}