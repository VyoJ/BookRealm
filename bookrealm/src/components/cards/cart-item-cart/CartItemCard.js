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
  // const price = order_type === 'Buy' ? bookdata.price*options.quantity : bookdata.price*options.hr/20
  const getprice = () => {
    return order_type === 'Buy' ? bookdata.price*options.quantity : bookdata.price*options.hr/20
  }
  <cartContext.Provider value={{ cartItem, totalAmount, setcartItem, price }}></cartContext.Provider>

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
        <p>Order-Type : {order_type}</p>
       {order_type === 'Buy' ?
       <p>Quantity : {options.quantity}</p> : 
       <p>Hours : {options.hr}</p>
      }
        <h3 className="cart-item-price"><b>&#8377;{getprice() }</b></h3>
        
        <button onClick={handleRemove} className="delete_button">
          Remove from Cart
        </button>
      </div>
    </section>
  );
};

export default CartItemCard;