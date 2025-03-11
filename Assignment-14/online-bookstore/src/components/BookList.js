import React, { useState } from "react";
import { Link } from "react-router-dom";

function BookList({ books }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <h2>Available Books</h2>

      {filteredBooks.length === 0 ? (
        <p>No books found matching your search criteria.</p>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.imageUrl} alt={book.title} />
                {!book.available && (
                  <div className="out-of-stock">Out of Stock</div>
                )}
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <p className="price">${book.price.toFixed(2)}</p>
                <Link to={`/book/${book.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
