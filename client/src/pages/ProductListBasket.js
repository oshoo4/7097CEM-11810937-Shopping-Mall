import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import Product from '../components/Product';

const ProductListBasket = () => {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket') || '[]'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiService.getProducts();
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

     useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);


    const addToBasket = (product) => {
        setBasket([...basket, product]);
    };

    const removeFromBasket = (productToRemove) => {
        const updatedBasket = basket.filter(product => product._id !== productToRemove._id);
        setBasket(updatedBasket);
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <Product key={product._id} product={product} onAddToBasket={addToBasket} />
                ))}
            </div>

            <h2>Shopping Basket</h2>
            <ul>
                {basket.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price.toFixed(2)}
                        <button onClick={() => removeFromBasket(product)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductListBasket;