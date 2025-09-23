import { SERVER_ENDPOINTS } from "./pathList";

const appState = {
    'APP_ENV' : 'PRODUCTION'
}
/**
 * Returns the URL of the API server based on the current app state.
 *
 * @returns {string} The URL of the API server.
 */
const getEnv = () => {
    /**
     * Possible values are:
     * 'https://v-menu.eu' (production environment)
     * 'http://localhost:7707' (development environment)
     */
    return SERVER_ENDPOINTS?.[appState.APP_ENV]
}
const getAppState = () => {return appState.APP_ENV}
export {appState,getEnv,getAppState};   