import { SERVER_ENDPOINTS } from "./pathList";

const appState = {
    'APP_ENV' : 'PRODUCTION'
}
const getEnv = () => {
    return SERVER_ENDPOINTS?.[appState.APP_ENV]
}
const getAppState = () => {return appState.APP_ENV}
export {appState,getEnv,getAppState};   