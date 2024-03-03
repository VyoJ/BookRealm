import React from "react";
import "./productlistingall.style.css";
import ProductListingCard from "../../cards/product-listing-card/product-listing-card/ProductListingCard";
import { useState, useEffect } from "react";
import axios from "axios";

export const ProductListingAll = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:2000/book");
        console.log(response);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="grid-container">
          {books.map((book) => {
            return (
              <div key={book.id} className="grid-item">
                <ProductListingCard bookData={book} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
