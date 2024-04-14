import React from "react";
import Footer from "../../components/layouts/footer/footer";
import Navbar from "../../components/layouts/navbar/Navbar";
import ApprovalGrid from "./bookApproval";
import { Link } from "react-router-dom";

const MyPublications = () => {
  let userId = localStorage.getItem("userId");

  return (
    <section className="MyBookspage">
      <Navbar darkTheme={true} />
      <Link to="/bookupload">
        <button className="button-primary ml-4">Upload a book</button>
      </Link>
      <ApprovalGrid userId={userId} />
      <Footer />
    </section>
  );
};

export default MyPublications;
