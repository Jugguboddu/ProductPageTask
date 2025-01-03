App.js
import React from 'react'
import ProductPage from './ProductPage'
import ProductCartPage from './ProductCartPage'

export default function 
() {
  return (
    <div>
      <ProductPage/>
      <ProductCartPage/>
    </div>
  )
}



Productpage



import React, { useState, useEffect } from "react";
import './ProductCartPage'

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="productitle">Product Page</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "4px solid #ccc",
              borderRadius: "5px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            {/* <p>{product.images}</p> */}
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
              style={{
                padding: "10px 15px",
                background: "#007bff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;







CARTPAGE


import React, { useState } from "react";

const ProductCartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      title: "Product 2",
      price: 49.99,
      quantity: 1,
    },
    
  ]);

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              <div>
                <h4>{item.title}</h4>
                <p>${item.price.toFixed(2)} x</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                
              >
                Remove
              </button>
            </div>
          ))}
          <h3 style={{ marginTop: "20px" }}>
            Total: ${getTotal().toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductCartPage;

