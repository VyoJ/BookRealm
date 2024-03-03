import React from "react";
import "./productListing.styles.css";
import ProductListingCard from "../../cards/product-listing-card/product-listing-card/ProductListingCard";
import axios from "axios";
import { useState, useEffect } from "react";

function ProductListing() {
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
    <div className="product-listing-container">
      <div className="container">
        <h2>
          Here are some <span className="text-primary">books</span> that you
          might like
        </h2>
        <div className="listings-wrapper">
          {books.map((book, index) => (
            <ProductListingCard key={index} bookData={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
