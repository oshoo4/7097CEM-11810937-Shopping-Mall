import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const featuredProduct = {
        name: 'Awesome T-Shirt',
        description: 'Super soft and comfortable, 100% cotton.',
        imageUrl: 'https://placehold.co/300.jpg',
        price: 19.99,
    };

    return (
        <div>
            <h1>Welcome to Our Shopping Mall!</h1>
            <p>
                There's a wide range of high-quality T-shirts and Jeans, all
                hand-picked from my personal wardrobe!  Enjoy a seamless shopping
                experience with our easy-to-use online store.
            </p>

            <h2>Featured Product</h2>
            <div style={{ border: '1px solid #ddd', padding: '10px', width: '300px' }}>
                <img src={featuredProduct.imageUrl} alt={featuredProduct.name} style={{ width: '100%' }} />
                <h3>{featuredProduct.name}</h3>
                <p>{featuredProduct.description}</p>
                <p>Price: ${featuredProduct.price.toFixed(2)}</p>
            </div>

            <Link to="/products">
                <button>View All Products</button>
            </Link>
        </div>
    );
};

export default Home;