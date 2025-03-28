import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <CartSummary />
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <div className="col-md-2">
          <br />
          <br />
          <br />
          <br />
          <br />
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-10">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </>
  );
}

export default BookPage;
