import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/Animations/Loading';
import Home from './Pages/Home';
import SetOptions from './components/Options/SetOptions';
import RequireObjectState from './contexts/ObjectStateCTX';
import ShowProductDetails from './components/Pages/ProductDetails';
import { CartProvider } from './contexts/CartCTX';
import { PATH_LIST } from './utils/pathList';
function App() {

return (

<>
    <CartProvider>
        <Suspense fallback={<LoadingAnimation />}>
        <Routes>
            <Route path={PATH_LIST.APP_SET_OPTIONS} element={<SetOptions />}/>
            <Route element={<RequireObjectState />}>
                <Route path={PATH_LIST.APP_HOME} element={<Home />} />

                <Route path={PATH_LIST.APP_PRODUCT} element={<ShowProductDetails />}/>
            </Route>
        </Routes>
        </Suspense>
    </CartProvider>
</>

);

}

export default App;