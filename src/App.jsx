import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/Animations/Loading';
import SetOptions from './components/Options/SetOptions';
import RequireObjectState from './contexts/ObjectStateCTX';
import { CartProvider } from './contexts/CartCTX';
import { ERROR_PATHS, PATH_LIST } from './utils/pathList';
import Checkout from './components/PageComponents/Checkout/Checkout';
import ShowCheckoutError from './components/PageComponents/Errors/CheckoutError';
import { NotFound } from './components/PageComponents/Errors/NotFound';
import { QRError } from './components/PageComponents/Errors/QRError';
import { TableError } from './components/PageComponents/Errors/TableError';
import ProfilePage from './components/PageComponents/Auth/Profile';
import { CooldownProvider } from './contexts/CoolDownCTX';
const Home = lazy(() => import('./Pages/Home'));
const ShowProductDetails = lazy(() => import('./components/Pages/ProductDetails'));
const CategoryDetails = lazy(() => import('./components/PageComponents/Categories/CategoryDetails'));
const CategoryList = lazy(() => import('./components/PageComponents/Categories/CategoryList'));
const Cart = lazy(() => import('./components/PageComponents/Cart/Cart'));
const Announces = lazy(() => import('./components/PageComponents/Announces/List'));
const AnnounceDetails = lazy(() => import('./components/PageComponents/Announces/Details'));
const FinalCheckoutPage = lazy(() => import('./components/PageComponents/Checkout/Final'));
function App() {

return (

<>
    <CartProvider>
        <CooldownProvider>
     <Suspense fallback={<LoadingAnimation />}>
        <Routes>
            <Route path={PATH_LIST.APP_SET_OPTIONS} element={<SetOptions />}/>
            <Route element={<RequireObjectState />}>
                <Route path={PATH_LIST.APP_HOME} element={<Home />} />
                <Route path={PATH_LIST.CATEGORY_DETAILS} element={<CategoryDetails/>}/>
                <Route path={PATH_LIST.CATEGORY_LIST} element={<CategoryList/>}/>
                <Route path={PATH_LIST.APP_PRODUCT} element={<ShowProductDetails />}/>
                <Route path={PATH_LIST.APP_CART} element={<Cart/>}/>
                <Route path={PATH_LIST.ANNOUNCE_LIST} element={<Announces/>}/>
                <Route path={PATH_LIST.ANNOUNCE_DETAILS} element={<AnnounceDetails/>}/>
                <Route path={PATH_LIST.APP_CHECKOUT} element={<Checkout/>}/>
                <Route path={PATH_LIST.FINAL_CHECKOUT} element={<FinalCheckoutPage/>}/>
                <Route path={ERROR_PATHS.CHECKOUT_ERROR} element={<ShowCheckoutError/>}/>
                <Route path={PATH_LIST.AUTH_PROFILE} element={<ProfilePage/>}/>
            </Route>
            <Route path='*' element={<NotFound/>}/>
            <Route path={ERROR_PATHS.QR_ERROR} element={<QRError/>}/>
            <Route path={ERROR_PATHS.OBJECT_ERROR} element={<TableError/>}/>
        </Routes>

     </Suspense>
</CooldownProvider>
    </CartProvider>
</>

);

}

export default App;