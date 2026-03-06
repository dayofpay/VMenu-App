import { SERVER_ENDPOINTS } from "./pathList";

const appState = {
    'APP_ENV' : 'PRODUCTION',
    'STRIPE_PUBLIC_KEY' : 'pk_live_51PDyJj02FRMXI6sgqRwQYJfKEVwNSYTtBE8wRiaWsdr252Mx4qbX9KmYlTipL2oU8kl3miaZ7szMf0ZLcLsmv5qU00R7pBijHf',
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
/**
 * Returns a property from the app state object.
 *
 * @param {string} property The name of the property to retrieve.
 * @returns {string|null} The value of the property, or null if it does not exist.
 */
const getAppProperty = (property) => {
    return appState?.[property] || null;
}
const getAppState = () => {return appState.APP_ENV}
export {appState,getEnv,getAppState,getAppProperty};   