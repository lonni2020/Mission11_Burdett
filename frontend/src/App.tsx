import './App.css';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SummaryPage from './pages/SummaryPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route
              path="/summary/:title/:bookID/:price"
              element={<SummaryPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminBooks" element={<AdminBooksPage/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
