import React, { useState, useEffect } from "react";
import BookItem from "../components/BookItem";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from the database and update the state
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Make an API call to fetch books data from the database
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/get-books`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="relative ... max-w-3xl mx-auto bg-white ml-auto">
      <h1 className="text-center p-10">Book Details</h1>
      <div className="flex gap-3 p-3 flex-wrap">
        {books.map((book) => (
          <BookItem key={book.book_id} book={book} />
        ))}
      </div>
    </div>
  );
}
