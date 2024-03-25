import React, { useState, useEffect } from 'react';

function BookApprovalRequests() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:2000/admin/approvalrequests');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const approveBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:2000/admin/${bookId}/approve`, {
                method: 'PATCH'
            });
            if (!response.ok) {
                throw new Error('Failed to approve book');
            }
            fetchBooks(); // Refresh book list after approval
        } catch (error) {
            console.error('Error approving book:', error);
        }
    };

    const rejectBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:2000/admin/${bookId}/reject`, {
                method: 'PATCH'
            });
            if (!response.ok) {
                throw new Error('Failed to reject book');
            }
            fetchBooks(); // Refresh book list after rejection
        } catch (error) {
            console.error('Error rejecting book:', error);
        }
    };

    return (
        <div>
            <h1>Book Approval Requests</h1>
            <div>
                {books.map(book => (
                    <div key={book._id}>
                        <p>Title: {book.title}</p>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <button onClick={() => approveBook(book._id)}>Approve</button>
                        <button onClick={() => rejectBook(book._id)}>Reject</button>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookApprovalRequests;
