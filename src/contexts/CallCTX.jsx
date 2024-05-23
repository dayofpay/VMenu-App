import { createContext } from "react";
import { createCall } from "../services/userServices";
import React from "react";
export const CallContext = createContext();

export const CallProvider = ({
    children,

}) => {
    const callHandler = async(data) => {
        const result = await createCall(data)
        console.log(data);
        if(!result.hasError){
            // setCallMessage('Успешно изпратихте повикване до служителите!')
        }

        else{
            // setCallMessage('Възникна грешка при изпращането на повикването!')
        }
    }
    const logValues = {
        callHandler
        // Insert submit handlers here
  } 
     return (
        <CallContext.Provider value={logValues}>
            {children}
        </CallContext.Provider>
    )
}
CallContext.displayName = 'CallContext';
export default CallContext;