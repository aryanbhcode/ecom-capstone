import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <h3 className="cart-total">Total: ${total}</h3>
          <div className="cart-buttons">
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
