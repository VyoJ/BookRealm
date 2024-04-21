import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ApprovalGrid = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/book/approval/${userId}`
        );
        const books = response.data;
        setUserBooks(books);
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <div>
      <h2 className="font-semibold text-primary text-center mt-4 text-3xl">
        Your Book Approval Requests
      </h2>
      <div className="">
        {userBooks.map((book) => (
          <div key={book._id} className="max-w-sm rounded shadow-lg m-4">
            <img className="w-full" src={book.image} alt={book.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{book.title}</div>
              <p className="text-gray-700 text-base">{book.authors}</p>
              <p className="text-gray-700 text-sm">{book.price}</p>
              <p className="text-gray-500 text-sm my-1">{book.subtitle}</p>
              {book.approved === "Approved" ? (
                <Link to={"/book-details/" + book._id}>
                  <p className="text-[#2cfc03] text-sm">{book.approved}</p>
                </Link>
              ) : (
                <p className="text-[#fc0303] text-sm">{book.approved}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalGrid;
