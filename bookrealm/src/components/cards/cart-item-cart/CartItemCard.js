import React, { useContext, useState } from "react";
import "./cart-item-card.style.css";
import { cartContext } from "../../../App";
import { useLocation } from "react-router-dom";

const CartItemCard = ({ bookdata }) => {
  const location = useLocation()
  console.log(location)
  const { cartItem, setcartItem } = useContext(cartContext);
  const [options,setoptions] = useState(location.state.options)
  const  order_type = location.state.type
  console.log(order_type)
  // console.log(bookdata);
  const handleRemove = () => {
    // console.log(bookdata);
    setcartItem(cartItem.filter((item) => item._id !== bookdata._id));
  };

  return (
    <section className="cart-item">
      <div className="cart-item-img-container">
        <img
          src={bookdata.image}
          alt="cart-item-img"
          className="cart-item-img"
        />
      </div>
      <div className="cart-item-content-container">
        <h2 className="text-primary"><b>{bookdata.title}</b></h2>
        <p>{bookdata.authors}</p>
        <p>Quantity : {options.quantity}</p>
        <p>Order-Type : {order_type}</p>
        <h3 className="cart-item-price">&#8377;{bookdata.price}</h3>
        
        <button onClick={handleRemove} className="delete_button">
          Remove from Cart
        </button>
      </div>
    </section>
  );v
};

export default CartItemCard;
