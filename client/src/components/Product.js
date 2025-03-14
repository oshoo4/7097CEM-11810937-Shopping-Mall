import React from 'react';

const Product = ({ product, onAddToBasket }) => {
    return (
        <div>
            <h3>{product.name}</h3>
            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px' }} />
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => onAddToBasket(product)}>Add to Basket</button>
        </div>
    );
};

export default Product;