import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookDetails({ books, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === parseInt(id));
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      // Redirect to home page if book not found
      navigate("/");
    }
  }, [id, books, navigate]);

  const handleAddToCart = () => {
    if (book && book.available) {
      addToCart(book);
      setAdded(true);

      // Reset the "Added to Cart" message after 3 seconds
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    }
  };

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-details-container">
      <div className="book-details">
        <div className="book-image-container">
          <img src={book.imageUrl} alt={book.title} />
        </div>

        <div className="book-info-container">
          <h2>{book.title}</h2>
          <p className="author">by {book.author}</p>
          <p className="price">${book.price.toFixed(2)}</p>

          <div className="availability">
            <span className={book.available ? "in-stock" : "out-of-stock"}>
              {book.available ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>

          <div className="actions">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!book.available || added}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            <button className="back-btn" onClick={() => navigate("/")}>
              Back to Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
