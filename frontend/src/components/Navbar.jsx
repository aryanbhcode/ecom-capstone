import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/cart" className="nav-link">
          Cart ({cart.length})
        </Link>
        {user?.user.isAdmin && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="welcome-text">Welcome, {user.user.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
