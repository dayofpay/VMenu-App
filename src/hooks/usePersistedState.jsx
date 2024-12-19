import { useState } from "react";


/**
 * usePersistedState is a hook that returns a state variable and a function to
 * update that state variable. The state variable is initialized with the value
 * stored in local storage under the provided key, or the provided default value
 * if no value is stored in local storage.
 *
 * @param {string} key The key to store the state under in local storage
 * @param {*} defaultValue The value to use if no value is stored in local storage
 * @returns {Array} An array containing the state variable and a function to
 * update it. The function will update the state variable and store the new value
 * in local storage.
 */
export default function usePersistedState(key,defaultValue){
    const [state,setState] = useState(() => {
        /**
         * The value stored in local storage under the provided key
         */
        const persistedState = localStorage.getItem(key);

        /**
         * If a value is stored in local storage, parse it and return it. Otherwise,
         * return the default value.
         */
        if(persistedState){
            return JSON.parse(persistedState);
        }

        return defaultValue;
    });

    /**
     * A function to update both the state and the local storage with a new value
     *
     * @param {*} value The new value to store in state and local storage
     */
    const setPersistedState = (value) => {
        /**
         * Update the state with the new value
         */
        setState(value);

        /**
         * Variable to hold the serialized version of the value. If the provided
         * value is a function, we need to call it with the current state and
         * serialize the result. Otherwise, we can directly serialize the
         * provided value.
         */
        let serializedValue;

        /**
         * Check if the provided value is a function
         */
        if (typeof value === 'function') {
            /**
             * If it's a function, call it with the current state and serialize the result
             */
            serializedValue = JSON.stringify(value(state));
        } else {
            /**
             * Otherwise, directly serialize the provided value
             */
            serializedValue = JSON.stringify(value);
        }

        /**
         * Store the serialized value in local storage under the specified key
         */
        localStorage.setItem(key, serializedValue);
    };

    /**
     * Return an array containing the state variable and the function to update it
     */
    return [
        state,
        setPersistedState
    ]
}
