import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { CartContext } from "../context/CartContext";
import "../index.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="loading-text">Loading...</p>;

  return (
    <div className="product-detail-page">
      <h2>{product.name}</h2>
      <div className="product-detail-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <p>{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
