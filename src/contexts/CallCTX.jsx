import { createContext } from "react";
import { createCall } from "../services/userServices";
import React from "react";
export const CallContext = createContext();

export const CallProvider = ({
    // The children prop is an array of React elements that should be rendered
    // when the user is logged in.
    children,

}) => {
    /**
     * This function is called when the user submits the login form.
     * It takes in a data object which contains the login form data,
     * and it calls the createCall function from userServices.js to
     * create a new call in the database.
     * If the call is successful, it sets the call message to a success
     * message, and if it fails, it sets the call message to an error
     * message.
     * 
     * @param {Object} data The data object containing the call form data.
     */
    const callHandler = async(data) => {
        /**
         * Call the createCall function from userServices.js to create a new call
         * in the database.
         */
        const result = await createCall(data)

        /**
         * Log the data object to the console for debugging purposes
         */
        console.log(data);

        /**
         * If the call is successful, set the call message to a success message
         */
        if(!result.hasError){
            // setCallMessage('Успешно изпратихте повикване до служителите!')
        }

        /**
         * If the call fails, set the call message to an error message
         */
        else{
            // setCallMessage('Възникна грешка при изпращането на повикването!')
        }
    }

    /**
     * This object contains the submit handlers for the login form.
     * It is passed to the value prop of the CallContext.Provider component
     * so that the submit handlers can be accessed by any child components
     * that need them.
     */
    const logValues = {
        callHandler
        // Insert submit handlers here
  } 

    /**
     * This component renders the children prop, which is an array of React
     * elements that should be rendered when the user is logged in.
     * It also renders the CallContext.Provider component, which wraps the
     * children prop and provides the submit handlers to any child components
     * that need them.
     */
    return (
        <CallContext.Provider value={logValues}>
            {children}
        </CallContext.Provider>
    )
}
CallContext.displayName = 'CallContext';
export default CallContext;