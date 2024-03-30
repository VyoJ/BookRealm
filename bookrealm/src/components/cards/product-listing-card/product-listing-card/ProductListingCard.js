import React, { useContext } from "react";
import "./productListingCard.styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext,cartContext } from "../../../../App";
import axios from "axios";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductListingCard = ({ bookData }) => {
  const navigate = useNavigate()
  const user = useContext(userContext)
  const {cartItem,setcartItem} =useContext(cartContext)

 const handelclick = () => {
   navigate(`/book-details/${bookData._id}`)
  //  navigate('books')
 }
 const handelAddClick =() => {
  if(user) {
    setcartItem([...cartItem,bookData])
    alert(`The book ${bookData.title} is added ot the cart`);
    navigate('/books')
  } else {
    navigate("/login");
    alert("Please login in to your account to proceed");
  }
 }


  return (
    <div className="product-listing-card " >
      <div className="product-listing-img-container">
        <img
          src={bookData.image}
          alt="product-listing"
          className="product-listing-image"
          onClick={handelclick}
        />
      </div>
      <div className="product-listing-details-container" onClick={handelclick}>
        <div >
        <h3 className="text-primary"><b>{bookData.title.slice(0,45)}</b></h3>
        <p className="author-name"><small>{bookData.authors.slice(0, 80)}</small></p>
        </div>
        <p className="pricing">&#8377;{bookData.price}</p>
      </div>
      {/* <div className="card-btn-container">
        <Link
          to={`/book-details/${bookData._id}`}
          className="product-listing-button"
        >


          <button className="btn-addcart"><medium className="text-secondary">Add To Cart</medium></button>
           </Link>
      </div> */}
      <div className="card-btn-container">
      <button className="btn-addcart text-secondary" onClick={handelAddClick}>Add to  <FontAwesomeIcon icon={faCartShopping} /></button>
      <button className="btn-addcart text-secondary" onClick={handelclick}>
        View
      </button>

      </div>
    </div>
  );
};

export default ProductListingCard;
