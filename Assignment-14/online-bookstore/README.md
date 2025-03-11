# Online Bookstore React Application

A beautiful and functional online bookstore built with React, featuring book listings, detailed book views, shopping cart functionality, and an admin panel to add new books.

## Features

- **Homepage with Book List**: View all available books with search functionality
- **Book Details Page**: See detailed information for each book
- **Shopping Cart**: Add and remove books from your cart
- **Admin Panel**: Add new books to the store
- **Local Storage**: Data persists after page refresh
- **Responsive Design**: Looks great on all devices

## Project Structure

```
📦 online-bookstore
┣ 📂 src
┃ ┣ 📂 components
┃ ┃ ┣ 📜 BookList.js
┃ ┃ ┣ 📜 BookDetails.js
┃ ┃ ┣ 📜 AddBook.js
┃ ┣ 📜 App.js
┃ ┣ 📜 App.css
┃ ┣ 📜 index.js
┃ ┣ 📜 index.css
┣ 📜 package.json
┣ 📜 README.md
```

## Implementation Details

### Module 1: Book List (Homepage)

- Displays a grid of available books with title, author, and price
- Search functionality to filter books by title or author
- "View Details" button for each book
- Visual indication for out-of-stock books
- Uses React Router for navigation

### Module 2: Book Details Page

- Shows comprehensive book information (title, author, price, description)
- Displays availability status
- "Add to Cart" button with confirmation feedback
- "Back to Books" navigation option

### Module 3: Add a New Book (Admin Panel)

- Form with validation for title, author, price, and description
- Form prevents empty submissions
- Success notification upon adding a book
- Books are saved to localStorage for persistence

### Enhanced Features

- **Shopping Cart Management**: Add/remove books, view quantity and total
- **Local Storage Integration**: Book data and cart items persist after refresh
- **Styled Components**: Beautiful, responsive UI with consistent color scheme
- **Search Functionality**: Dynamic filtering of books by title or author

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
   ```
   git clone [repository-url]
   ```
2. Navigate to the project directory
   ```
   cd online-bookstore
   ```
3. Install dependencies
   ```
   npm install
   ```
4. Start the development server
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Browsing Books

- View all books on the homepage
- Use the search bar to find specific books
- Click "View Details" to see more information about a book

### Shopping Cart

- Add books to your cart from the book details page
- View your cart by clicking the cart icon in the navigation bar
- Remove items from your cart as needed

### Adding New Books (Admin)

- Navigate to the "Add Book" page from the navigation bar
- Fill out all required fields
- Click "Add Book" to save the new book to the store

## Technologies Used

- React
- React Router
- CSS
- LocalStorage API
