import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { cartContext } from "../../../App";
import CartItemCard from "../../cards/cart-item-cart/CartItemCard";
import "./CartItemContainer.style.css";
import CartBackendContext from "../../../pages/context/CartBackendContext";
import { toast } from "react-toastify";
import axios from "axios";

export const CartItemContainer = () => {
  const context = useContext(CartBackendContext);
  const { getcartItem, deleteCartItem } = context;
  const { cartItem, totalAmount, setcartItem } = useContext(cartContext);
  const [itemBought, setitemBought] = useState([]);
  const stripeKey =
    "pk_test_51OzK3tSF4U7blLf0thrL3ZFYuWz3am5wArcUroVJAtyzh8msqN2m2yxljQPJReHQnVvUvyMEp58Jbr3sqNMvkRID00XmVUg2SJ";
  const navigate = useNavigate();
  // let itemBought = null
  // const [Bought, setBought] = useState([]);
  console.log(itemBought,"itemBought")
 
useEffect(() => {
  const fetchData = async () => {
    try {
      await getcartItem();
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  fetchData();
}, []);

const clearCart = () => {
  cartItem.map((item) => (
    deleteCartItem(item._id)
  ))
}


  const onToken = async (token) => {
    //the actuall payment to be handel in the backend from here
  console.log('payment token ',token)
  toast.success('your payment has been processed')
    setitemBought(cartItem)
    console.log(itemBought)
    clearCart()
  console.log(itemBought, "itemBought");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await getcartItem();
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

//   const onToken = async (token) => {
//     //the actuall payment to be handel in the backend from here
//     Token = token;
//     console.log(token);
//     console.log(Token, "Token");
//     alert("your payment has been processed");
//     setitemBought(cartItem);
//     console.log(itemBought);
//     setcartItem([]);
//     // itemBought = cartItem
//     // navigate('/books')
// }


  // useEffect(() => {
  //   console.log(itemBought, "Updated itemBought");
  // }, [itemBought]);
    // setBought([cartItem]);

    // const transactionData = {
    //   userId: localStorage.getItem("userId"),
    //   itemsBought: itemBought,
    //   totalAmount: totalAmount,
    // };

    // try {
    //   const response = await axios.post(
    //     "http://localhost:2000/transactions",
    //     transactionData
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error sending transaction data:", error);
    // }

    const transactionData = cartItem.map((item) => ({
      userid: localStorage.getItem("userId"),
      bookid: item.bookid,
      type: item.type,
      price: item.price,
      rent_period: item.rent_period,
    }));

    console.log("Data:", transactionData);

    try {
      for (let data of transactionData) {
        console.log("Inside: ", data);
        const response = await axios.post(
          "http://localhost:2000/transaction/" +
            (data.type === "Buy" ? "buy" : "rent"),
          data
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error sending transaction data:", error);
    }
  };

  useEffect(() => {
    console.log(itemBought, "Updated itemBought");
  }, [itemBought]);

  return (
    <section className="card-item-container">
      <div className="container">
        {totalAmount === 0 ? (
          <h2 className="text-primary text-center mt-14 mb-14">
            Currently your cart is empty
          </h2>
        ) : (
          <React.Fragment>
            <h2 className="text-secondary ">
              <b>
                Your <span className="text-primary ">Cart</span> Order
              </b>
            </h2>
            {cartItem.map((item) => (
              <CartItemCard key={item.id} bookdata={item} />
            ))}
            <h2 className="text-primary">
              Total Amount = &#8377;{totalAmount}
            </h2>
            <StripeCheckout
              name="Book Checkout"
              description="Please fill in the details below"
              amount={totalAmount * 100}
              currency="INR"
              stripeKey={stripeKey}
              token={onToken}
              billingAddress
            >
              <button className="button-primary">
                <small>Proceed to Checkout</small>
              </button>
            </StripeCheckout>
          </React.Fragment>
        )}
      </div>
    </section>
  );
};
