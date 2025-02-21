import { SERVER_ENDPOINTS } from "./pathList";

const appState = {
    'APP_ENV' : 'DEVELOPMENT'
}
const getEnv = () => {
    return SERVER_ENDPOINTS?.[appState.APP_ENV]
}
export {appState,getEnv};