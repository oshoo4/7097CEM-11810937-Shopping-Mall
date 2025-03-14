import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket') || '[]'));
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = basket.reduce((total, item) => total + item.price, 0);

    const handleConfirmOrder = () => {
        localStorage.removeItem('basket');
        setBasket([]);
        setOrderConfirmed(true);
        setTimeout(() => {
            navigate('/products');
          }, 3000);
    };

    if (!user) {
        return <div>You must be logged in to view the checkout page.</div>;
    }

    if (orderConfirmed) {
        return <div>Thank you for your order! You will be redirected shortly.</div>;
    }

    if (basket.length === 0) {
        return <div>Your basket is empty.</div>;
    }

    return (
        <div>
            <h2>Checkout</h2>
            <h3>Order Summary</h3>
            <ul>
                {basket.map(item => (
                    <li key={item._id}>
                        {item.name} - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
    );
};

export default Checkout;