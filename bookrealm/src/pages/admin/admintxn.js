import React, { useState, useEffect } from "react";
import Navbar from "../../components/layouts/navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminTransactions() {
  let [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTxns() {
      try {
        let txns = await axios.post("http://localhost:2000/transaction", {
          user: "admin",
        });
        setTransactions(txns);
      } catch (error) {
        console.log(error);
      }
    }
    getTxns();
  }, []);

  return (
    <>
      <Navbar darkTheme={true} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Book
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <Link to={"/admin/transactions/" + txn._id}>
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {txn.date}
                  </th>
                  <td className="px-6 py-4">{txn.userid}</td>
                  <td className="px-6 py-4">{txn.bookid}</td>
                  <td className="px-6 py-4">{txn.amount}</td>
                  <td className="px-6 py-4">{txn.type}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminTransactions;
