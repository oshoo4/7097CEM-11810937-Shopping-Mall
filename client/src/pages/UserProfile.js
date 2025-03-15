import React, { useState, useEffect, useContext } from 'react';
import apiService from '../services/api';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await apiService.getProfile();
                setProfile(profileData);
                const ordersData = await apiService.getUserOrders();
                setOrders(ordersData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if(user){
          fetchData();
        }
    }, [user]);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!user) {
      return <div>You must be logged in to view this page.</div>;
    }

    if (!profile) {
        return <div>No profile data found.</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>

            <h3>Order History</h3>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            Order ID: {order._id} - Total: ${order.totalPrice.toFixed(2)} - Date: {new Date(order.orderDate).toLocaleDateString()}
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.product._id}>
                                        {item.product.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserProfile;