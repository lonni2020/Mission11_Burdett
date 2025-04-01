import { useNavigate } from 'react-router-dom';
import { book } from '../types/Book';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );

        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(totalItems / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(totalItems / pageSize))); // Ensures at least 1 page
  }, [totalItems, pageSize]);

  if (loading) return <p>Loading Books</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <br />

      {/* Sorting Dropdown */}
      <div className="mb-3 text-center">
        <label className="form-label fw-bold">Sort by:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Title (A-Z)</option>
          <option value="desc">Title (Z-A)</option>
        </select>
      </div>
      <div className="row g-4">
        {books.map((p) => (
          <div key={p.bookID} className="col-md-6">
            {' '}
            {/* Changed to 4 columns for better spacing */}
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-primary text-truncate">
                  {p.title}
                </h3>
                <ul className="list-unstyled">
                  <li>
                    <strong>Author:</strong> {p.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {p.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {p.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {p.classification}
                  </li>
                  <li>
                    <strong>Category:</strong> {p.category}
                  </li>
                  <li>
                    <strong>Page Count:</strong> {p.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${p.price}
                  </li>
                </ul>
                {/* Push button to the bottom right */}
                <button
                  className="btn btn-primary mt-auto ms-auto"
                  onClick={() =>
                    navigate(`/summary/${p.title}/${p.bookID}/${p.price}`)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default BookList;
