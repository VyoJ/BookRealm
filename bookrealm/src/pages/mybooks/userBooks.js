import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserBooksGrid = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/transaction/${userId}`
        );
        const cartItems = response.data;
        if (cartItems.length) {
          const booksPromises = cartItems.map(async (item) => {
            const bookResponse = await axios.get(
              `http://localhost:2000/book/${item.bookid}`
            );
            return bookResponse.data;
          });
          const books = await Promise.all(booksPromises);
          setUserBooks(books);
        }
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <div>
      <h2 className="font-semibold text-primary text-center mt-4 text-3xl">
        Your Books
      </h2>
      <div className="grid-container">
        {userBooks.map((book) =>
          book.type === "ebook" ? (
            // <Link key={book._id} to={"/mybook/" + book._id}>
            <Link key={book._id} to={book.url}>
              <div className="grid-item">
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.subtitle}</p>
                <p>Authors: {book.authors}</p>
              </div>
            </Link>
          ) : (
            <div key={book._id} className="grid-item">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <p>Authors: {book.authors}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserBooksGrid;
