import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow p-4">
            <h2 className="text-center text-primary">Your Cart</h2>
            <hr />

            {cart.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              <ul className="list-group mb-3">
                {cart.map((item: CartItem) => (
                  <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.title}</strong> - ${item.price.toFixed(2)}
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookID)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-dark">Total: <span className="text-success">
                ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </span></h3>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
                Continue Browsing
              </button>
              <button className="btn btn-success">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
