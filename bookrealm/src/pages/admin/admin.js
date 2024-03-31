// import React from "react";
// import Navbar from "../../components/layouts/navbar/Navbar";
// import Footer from "../../components/layouts/footer/footer";
// import BookApprovalRequests from "./approval";

// const BookApprovalpage = () => {
//   return (
//     <section>
//       <Navbar darkTheme={true} />
//       <BookApprovalRequests />
//       <Footer />
//     </section>
//   );
// };

// export default BookApprovalpage;

import React, { useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/footer";
import BookApprovalRequests from "./approval";
import LoginPage from "./adminlogin";
import { Link } from "react-router-dom";
import BookList from "../bookfunctions/book";

const BookApprovalPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const isAdmin = (username) => {
    // Dummy admin authorization logic
    // Check if the username is 'admin'
    return username === 'admin';
  };

  return (
    <section>
      <Navbar darkTheme={true} />
      {/* Check if the user is authenticated and is an admin before rendering the BookApprovalRequests */}
      {isAuthenticated && isAdmin(username) ? (
<div>
<div className="flex justify-center mt-4">
<Link to="/list" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
  Go to list Page
</Link>
</div>
        <BookApprovalRequests />
        <BookList />
        </div>
      ) : (
        <LoginPage
          authenticate={(username) => {
            setUsername(username);
            setIsAuthenticated(true);
          }}
        />
      )}
      <Footer />
    </section>
  );
};

export default BookApprovalPage;
