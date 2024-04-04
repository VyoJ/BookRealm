import axios from "axios";
import React, { useEffect, useState } from "react";

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
        setTransactions(response.data);
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
      {loading ? (
        <div>Loading your books...</div>
      ) : (
        <div>
          <h2>Your Books</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.description} - {transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
