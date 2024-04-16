// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const UserBooksGrid = ({ userId }) => {
//   const [userBooks, setUserBooks] = useState([]);

//   useEffect(() => {
//     const fetchUserBooks = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:2000/transaction/${userId}`
//         );
//         const cartItems = response.data;
//         if (cartItems.length) {
//           const booksPromises = cartItems.map(async (item) => {
//             const bookResponse = await axios.get(
//               `http://localhost:2000/book/${item.bookid}`
//             );
//             return bookResponse.data;
//           });
//           const books = await Promise.all(booksPromises);
//           setUserBooks(books);
//         }
//       } catch (error) {
//         console.error("Error fetching user books:", error);
//       }
//     };

//     fetchUserBooks();
//   }, [userId]);

//   return (
//     <div>
//       <h2 className="font-semibold text-primary text-center mt-4 text-3xl">
//         Your Books
//       </h2>
//       <div className="grid-container">
//         {userBooks.map((book) =>
//           book.type === "ebook" ? (
//             // <Link key={book._id} to={"/mybook/" + book._id}>
//             <Link key={book._id} to={book.url}>
//               <div className="grid-item">
//                 <img src={book.image} alt={book.title} />
//                 <h3>{book.title}</h3>
//                 <p>{book.subtitle}</p>
//                 <p>Authors: {book.authors}</p>
//               </div>
//             </Link>
//           ) : (
//             <div key={book._id} className="grid-item">
//               <img src={book.image} alt={book.title} />
//               <h3>{book.title}</h3>
//               <p>{book.subtitle}</p>
//               <p>Authors: {book.authors}</p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserBooksGrid;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const UserBooksGrid = ({ userId }) => {
//   const [userBooks, setUserBooks] = useState([]);

//   useEffect(() => {
//     const fetchUserBooks = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:2000/transaction/${userId}`
//         );
//         const cartItems = response.data;
//         if (cartItems.length) {
//           const booksPromises = cartItems.map(async (item) => {
//             const bookResponse = await axios.get(
//               `http://localhost:2000/book/${item.bookid}`
//             );
//             return bookResponse.data;
//           });
//           const books = await Promise.all(booksPromises);
//           setUserBooks(books);
//         }
//       } catch (error) {
//         console.error("Error fetching user books:", error);
//       }
//     };

//     fetchUserBooks();
//   }, [userId]);

//   return (
//     <div>
//       <h2 className="font-semibold text-primary text-center mt-4 text-3xl">
//         Your Books
//       </h2>
//       <div className="grid-container">
//         {userBooks.map((book) => (
//           <div key={book._id} className="max-w-sm rounded shadow-lg m-4">
//             <img className="w-full" src={book.image} alt={book.title} />
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl mb-2">{book.title}</div>
//               <p className="text-gray-700 text-base">{book.authors}</p>
//               <p className="text-gray-700 text-sm">{book.price}</p>
//               <p className="text-gray-500 text-sm my-1">{book.subtitle}</p>
//               {book.type === "ebook" ? (
//                 <Link to={"/mybook/" + book._id}>
//                   <button className="button-primary">Read Now!</button>
//                 </Link>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserBooksGrid;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserBooksGrid = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/transaction/${userId}`
        );
        const cartItems = response.data;
        if (cartItems.length) {
          const booksPromises = cartItems.map(async (item) => {
            const bookResponse = await axios.get(
              `http://localhost:2000/book/${item.bookid}`
            );
            return {
              ...bookResponse.data,
              rent_period: item.rent_period,
              date: item.date,
            };
          });
          const books = await Promise.all(booksPromises);
          console.log(books);
          setUserBooks(books);
        }
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  const isBookExpired = (book) => {
    const expiryDate = new Date(book.date);
    expiryDate.setHours(expiryDate.getHours() + book.rent_period);
    return new Date() > expiryDate;
  };

  return (
    <div>
      <h2 className="font-semibold text-primary text-center mt-4 text-3xl">
        Your Books
      </h2>
      <div>
        {userBooks.map((book, index) => (
          <div key={index} className="max-w-sm rounded shadow-lg m-4">
            <img className="w-full" src={book.image} alt={book.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{book.title}</div>
              <p className="text-gray-700 text-base">{book.authors}</p>
              <p className="text-gray-700 text-sm">{book.price}</p>
              <p className="text-gray-500 text-sm my-1">{book.subtitle}</p>
              {book.type === "ebook" ? (
                !isBookExpired(book) ? (
                  <Link to={"/mybook/" + book._id}>
                    <button className="button-primary">Read Now!</button>
                  </Link>
                ) : (
                  <p className="text-[#FF0000]">This book is expired.</p>
                )
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooksGrid;
