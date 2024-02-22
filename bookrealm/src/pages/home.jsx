import bg from "../assets/showcase-bg.jpg";
import axios from "axios";

// async function getBooks() {
//   let result = await axios.get("/book/");
//   console.log(result);
//   return result;
// }

function Home() {
  // let books = getBooks();
  let books;
  return (
    <div style={{ background: `url("../assets/showcase-bg.jpg")` }}>
      <section className="h-screen">
        <h1>
          The <span className="text-primary">Book </span>You Need
        </h1>
        <p>Best Books for all your needs</p>
      </section>
      {books && (
        <div className="product-listing-container">
          <div className="container">
            <h2>
              Here are some <span className="text-primary">books</span> that you
              might like
            </h2>
            <div className="listings-wrapper">
              {books.map((book) => (
                <BookCard key={book.id} bookData={book} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
