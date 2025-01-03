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
