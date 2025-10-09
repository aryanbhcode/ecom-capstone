import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../index.css";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced)
    return <h2 className="order-success">Order placed! Thank you.</h2>;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}
