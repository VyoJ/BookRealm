import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function ReadBook() {
  const { id } = useParams();
  const [userBooks, setUserBooks] = useState("");
  const [isBookInTransactions, setIsBookInTransactions] = useState(false);
  const url = new URL(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/transaction/${userId}`
        );
        const transactions = response.data;
        const bookIdsInTransactions = transactions.map(
          (transaction) => transaction.bookid
        );
        setIsBookInTransactions(bookIdsInTransactions.includes(id));
        if (bookIdsInTransactions.includes(id)) {
          const book = await axios.get(`http://localhost:2000/book/${id}`);
          if (book) {
            setUserBooks(book.data.url);
          }
        }
      } catch (error) {
        console.error("Error fetching user transactions:", error);
      }
    };

    fetchUserBooks();
  }, [id]);

  return (
    <div>
      {isBookInTransactions ? (
        // <div>
        //   <h2>Book Details</h2>
        //   <Document
        //     file={url}
        //     options={{ workerSrc: "/pdf.worker.js" }}
        //     onContextMenu={(e) => e.preventDefault()}
        //   >
        //     <Page pageNumber={1} />
        //   </Document>
        // </div>
        <div oncontextmenu="return false;">
          <embed src={userBooks + "#toolbar=0"} className="h-screen w-full" />
        </div>
      ) : (
        <h2>Unauthorised access</h2>
      )}
    </div>
  );
}

export default ReadBook;
