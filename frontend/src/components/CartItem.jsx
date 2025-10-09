export default function CartItem({ item, removeFromCart }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-price">Price: ${item.price}</span>
        <span className="cart-item-qty">Quantity: {item.quantity}</span>
      </div>
      <button
        className="cart-item-remove"
        onClick={() => removeFromCart(item._id)}
      >
        Remove
      </button>
    </div>
  );
}
