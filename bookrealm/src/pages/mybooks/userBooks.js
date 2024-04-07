import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserBooksGrid = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/cart/${userId}`);
        const cartItems = response.data;
        const booksPromises = cartItems.map(async item => {
          const bookResponse = await axios.get(`http://localhost:2000/books/${item.bookid}`);
          return bookResponse.data;
        });
        const books = await Promise.all(booksPromises);
        setUserBooks(books);
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <div>
      <h2>User's Books</h2>
      <div className="grid-container">
        {userBooks.map(book => (
          <div key={book._id} className="grid-item">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.subtitle}</p>
            <p>Authors: {book.authors.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooksGrid;
