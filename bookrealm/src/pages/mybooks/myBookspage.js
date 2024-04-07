import React from "react";
import Footer from "../../components/layouts/footer/footer";
import Navbar from "../../components/layouts/navbar/Navbar";
import UserBooksGrid from "./userBooks";

const MyBookspage = () => {
  return (
    <section className="MyBookspage">
      <Navbar darkTheme={true} />
      <UserBooksGrid userId="GX3XgcMe7ydweDlg3sixXWx2YEm2"/>
      <Footer />
    </section>
  );
};

export default MyBookspage;
