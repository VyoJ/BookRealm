import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar";

const MyBooks = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http:localhost:2000/transaction/${userId}`
        );
        setTransactions(Array.isArray(response.data) ? response.data : []);
        // setTransactions(response.data);
        console.log("Response: ", response);
        console.log("Txn", transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <Navbar darkTheme={true} />
      {loading ? (
        <div>Loading your books...</div>
      ) : (
        <div>
          <h2>Your Books</h2>
          {transactions.length != 0 && (
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>
                  {transaction.description} - {transaction.amount}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
