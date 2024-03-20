import React from "react";
import "./productListing.styles.css";
import ProductListingCard from "../../cards/product-listing-card/product-listing-card/ProductListingCard";
import { book } from "../../../util/bookData";

const ProductListing = () => {
  return (
    <div className="product-listing-container">
      <div className="container">
        <h2>
          Here are some <span className="text-primary">books</span> that you
          might like
        </h2>
        <div className="listings-wrapper">
          {book.map((book, index) => (
            <ProductListingCard key={index} bookData={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;