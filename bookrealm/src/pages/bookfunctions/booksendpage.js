import React from "react";
import Navbar from '../../components/layouts/navbar/Navbar';
import Footer from '../../components/layouts/footer/footer';
import BookList from "./book";


const BookSendpage = () => {
    return (
        <section>
            <Navbar darkTheme={true} /> 
            <BookList/>
           <Footer />
        </section>
    )
}

export default BookSendpage;