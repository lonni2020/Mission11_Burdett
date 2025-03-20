import { book } from './types/Book';
import { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setBooks(data.book);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBook();
  }, [pageSize, pageNum, sortOrder]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(totalItems / pageSize))); // Ensures at least 1 page
  }, [totalItems, pageSize]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Book Store</h1>
      <h3 className="text-center text-secondary">
        A list of our entire collection
      </h3>
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

      {/* Book List - Single column */}
      <div className="d-flex flex-column align-items-center">
        {books.map((p) => (
          <div
            key={p.bookID}
            className="card shadow-sm mb-4"
            style={{ maxWidth: '600px', width: '100%' }}
          >
            <div className="card-body">
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
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn ${pageNum === index + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary ms-2"
          disabled={pageNum >= totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Results per Page */}
      <div className="mt-3 text-center">
        <label className="fw-bold me-2">Results per page:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
