import React from "react";
import Footer from "../../components/layouts/footer/footer";
import Navbar from "../../components/layouts/navbar/Navbar";
import UserBooksGrid from "./userBooks";

const myBookspage = () => {
  return (
    <section className="myBookspage">
      <Navbar darkTheme={true} />
      <UserBooksGrid userId={userId}/>
      <Footer />
    </section>
  );
};

export default myBookspage;
