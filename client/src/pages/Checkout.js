import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Checkout = () => {
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket') || '[]'));
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = basket.reduce((total, item) => total + item.price, 0);

    const handleConfirmOrder = async () => {
        try {
            const orderItems = basket.map(item => ({
                productId: item._id,
                quantity: 1
            }));

            const order = await apiService.createOrder(orderItems);

            localStorage.removeItem('basket');
            setBasket([]);
            setOrderConfirmed(true);
            setError(null);
            setTimeout(() => {
                navigate('/products');
              }, 3000);

        } catch (err) {
            setError(err);
        }
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
            {error && <p className="error-message">{error.message}</p>}
            <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
    );
};

export default Checkout;