import React, { useEffect, createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import fire from "./firebase/Firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/homepage/homepage.js";
import BooksPage from "./pages/bookspage/BooksPage.js";
import BookDetailsPage from "./pages/bookdetailspage/BookDetails.js";
import { Signup } from "./pages/signuppage/signup.js";
import { Login } from "./pages/loginnpage/login.js";
import CartPage from "./pages/cartpage/Cartpage.js";
import ScrollToTop from "./components/util/ScrollToTop.js";
import SearchPage from "./pages/searchpage/SearchPage.js";
import BookUpload from "./pages/bookuploadpage/bookUpload.js";
import { UserPortal } from "./pages/userportal/UserPortal.js";
import BookApprovalpage from "./pages/admin/admin.js";
import BookSendpage from "./pages/bookfunctions/booksendpage.js";
// import { Portalstate } from "./pages/userportal/context/Portalstate.js";

export const userContext = createContext({});
export const cartContext = createContext({});


const App = () => {
  const auth = getAuth(fire);
  const [authenticateUser, setauthenticateUser] = useState("");
  const [cartItem, setcartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user, "from app.js");
      // console.log("userId", user.uid);
      if (user) {
        localStorage.setItem("userId", user.uid);
        setauthenticateUser(user);
      } else {
        localStorage.removeItem("userId");
        setauthenticateUser(null);
      }
    });
  }, [onAuthStateChanged]);

  useEffect(() => {
    let total = 0;
    cartItem.forEach((item) => {
      total = total + parseInt(item.price);
    });
    setTotalAmount(total);
  }, [cartItem]);

  


  return (
    <ScrollToTop>
      <userContext.Provider value={authenticateUser}>
        {/* <Portalstate> */}
        <cartContext.Provider value={{ cartItem, totalAmount, setcartItem }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book-details/:id" element={<BookDetailsPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bookupload" element={<BookUpload />} />
            <Route path="/user" element={<UserPortal />} />
            <Route path="/admin" element={<BookApprovalpage/>} />
            <Route path="/list" element={<BookSendpage/>} />
          </Routes>
        </cartContext.Provider>
        {/* </Portalstate> */}
      </userContext.Provider>
    </ScrollToTop>
  );
};

export default App;
