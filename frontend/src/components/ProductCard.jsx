import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-img" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <p className="product-stock">Stock: {product.stock}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <Link to={`/product/${product._id}`} className="view-details-link">
        View Details
      </Link>
    </div>
  );
}
