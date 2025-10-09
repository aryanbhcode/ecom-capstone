import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "../index.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
