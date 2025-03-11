import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import "./App.css";

function App() {
  const [books, setBooks] = useState(() => {
    // Try to get books from localStorage
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      return JSON.parse(savedBooks);
    } else {
      // Initial books data
      return [
        {
          id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          price: 12.99,
          description:
            "A classic novel about the American Dream set in the Roaring Twenties.",
          available: true,
          imageUrl: "https://source.unsplash.com/random/200x300/?book",
        },
        {
          id: 2,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          price: 14.99,
          description:
            "A powerful story of race and class in the American South during the 1930s.",
          available: true,
          imageUrl: "https://source.unsplash.com/random/200x300/?book",
        },
        {
          id: 3,
          title: "1984",
          author: "George Orwell",
          price: 11.99,
          description:
            "A dystopian novel about totalitarianism, surveillance, and censorship.",
          available: false,
          imageUrl: "https://source.unsplash.com/random/200x300/?book",
        },
      ];
    }
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addBook = (newBook) => {
    // Generate a unique ID for the new book
    const id =
      books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
    setBooks([
      ...books,
      {
        ...newBook,
        id,
        available: true,
        imageUrl: "https://source.unsplash.com/random/200x300/?book",
      },
    ]);
  };

  const addToCart = (book) => {
    // Check if book already exists in cart
    const existingBook = cart.find((item) => item.id === book.id);

    if (existingBook) {
      setCart(
        cart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <div className="logo">
            <h1>📚 Bookworm</h1>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add Book</Link>
            <div className="cart-icon">
              <Link to="/cart">
                🛒 Cart (
                {cart.reduce((total, item) => total + item.quantity, 0)})
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<BookList books={books} />} />
            <Route
              path="/book/:id"
              element={<BookDetails books={books} addToCart={addToCart} />}
            />
            <Route path="/add" element={<AddBook addBook={addBook} />} />
            <Route
              path="/cart"
              element={
                <div className="cart-page">
                  <h2>Shopping Cart</h2>
                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <div className="cart-items">
                      {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                          <img src={item.imageUrl} alt={item.title} />
                          <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            <p>Author: {item.author}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="cart-summary">
                        <h3>
                          Total: $
                          {cart
                            .reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </h3>
                        <button className="checkout-btn">Checkout</button>
                      </div>
                    </div>
                  )}
                </div>
              }
            />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2025 Bookworm Online Bookstore. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
