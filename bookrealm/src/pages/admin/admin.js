import React from "react";
import Navbar from '../../components/layouts/navbar/Navbar';
import Footer from '../../components/layouts/footer/footer';
import BookApprovalRequests from "./approval";


const BookApproval = () => {
    return (
        <section>
            <Navbar darkTheme={true} /> 
            <BookApprovalRequests/>
           <Footer />
        </section>
    )
}

export default BookApproval;