const PATH_LIST = {
    'APP_HOME' : '/',
    'APP_CART' : '/cart',
    'APP_PRODUCT' : '/products/:id',
    'APP_SET_OPTIONS' : '/:objectId/:tableId',
    'CATEGORY_DETAILS' : '/category/:id',
    'CATEGORY_LIST' : '/categories',
    'APP_CART' : '/cart',
    'ANNOUNCE_LIST' : '/announces',
    'ANNOUNCE_DETAILS' : '/announces/:id',
    'APP_CHECKOUT' : '/checkout',
    'FINAL_CHECKOUT' : '/checkout/final',
    'AUTH_PROFILE' : '/profile',
    'REVIEW_PAGE' : '/review',
}

const ERROR_PATHS = {
    'CHECKOUT_ERROR' : '/checkout/error',
    'QR_ERROR' : '/qr/error',
    'OBJECT_ERROR' : '/object/error',
    'UNPAID_INVOICE' : '/object/plan_expired',
    '*' : '/404',
}


const SERVER_ENDPOINTS = {
    'PRODUCTION' : 'https://v-menu.eu',
    'DEVELOPMENT' : 'http://localhost:7707',
}
export {PATH_LIST,SERVER_ENDPOINTS,ERROR_PATHS}