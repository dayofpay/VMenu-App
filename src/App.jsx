import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/Animations/Loading';
import Home from './Pages/Home';
import SetOptions from './components/Options/SetOptions';
import RequireObjectState from './contexts/ObjectStateCTX';
import ShowProductDetails from './components/Pages/ProductDetails';
function App() {
    
return (

<>

    <Suspense fallback={<LoadingAnimation />}>
    <Routes>
    <Route path="/:objectId/:tableId" element={<SetOptions/>}/>
        <Route element={<RequireObjectState/>}>
            <Route path="/" element={<Home />} />

            <Route path='/products/:id/' element={<ShowProductDetails/>}/>
        </Route>
    </Routes>
    </Suspense>

</>

);

}

export default App;