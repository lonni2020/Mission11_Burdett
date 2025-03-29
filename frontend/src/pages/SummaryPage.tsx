// SummaryPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { CartItem } from '../types/CartItem';
import CartSummary from '../components/CartSummary';

function SummaryPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart, cart } = useCart();

  const bookPrice = Number(price) || 0;
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    // Check if the book already exists in the cart and update the count accordingly
    const existingItem = cart.find((item) => item.bookID === Number(bookID));
    if (existingItem) {
      setCount(existingItem.count);
    }
  }, [cart, bookID]);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count > 1 ? count - 1 : 1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Title Available',
      count,
      price: count * bookPrice,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <CartSummary />
      <Header />
      <div className="container text-center mt-4">
        <h2 className="mb-4">Book Summary</h2>

        <div
          className="card mx-auto p-4 shadow-sm"
          style={{ maxWidth: '400px' }}
        >
          <h3 className="mb-3">{title || 'No Title Available'}</h3>
          <p className="text-muted">
            Price per book: <strong>${bookPrice.toFixed(2)}</strong>
          </p>

          <div className="d-flex align-items-center justify-content-center mb-3">
            <button
              className="btn btn-primary"
              onClick={decreaseCount}
              disabled={count === 1}
            >
              -
            </button>
            <span className="mx-3 fs-5">{count}</span>
            <button className="btn btn-primary" onClick={increaseCount}>
              +
            </button>
          </div>

          <p className="fw-bold fs-5">
            Total Price: ${(count * bookPrice).toFixed(2)}
          </p>

          <button className="btn btn-success w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <button className="btn btn-danger mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default SummaryPage;
