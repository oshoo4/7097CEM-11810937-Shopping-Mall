import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import ProductListBasket from './pages/ProductListBasket';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AuthContext } from './context/AuthContext';

function App() {
    const { shouldRedirect, resetShouldRedirect } = useContext(AuthContext);

    useEffect(() => {
      if (shouldRedirect) {
        resetShouldRedirect();
      }
    }, [shouldRedirect, resetShouldRedirect]);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginRegister />} />
                        <Route path="/products" element={<ProductListBasket />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                    </Routes>
                </main>
                <Footer />
                {shouldRedirect && <Navigate to="/login" replace={true} />}
            </div>
        </Router>
    );
}

export default App;