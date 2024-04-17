import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/Animations/Loading';
import Home from './Pages/Home';
function App() {
return (
<>
    <Suspense fallback={<LoadingAnimation />}>
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
    </Suspense>


</>

);

}

export default App;