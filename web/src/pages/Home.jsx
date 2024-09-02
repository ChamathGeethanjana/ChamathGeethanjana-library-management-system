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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [searchTerm]);

  return (
    <div className="max-w-4xl m-auto ">
      <div className="max-w-xl gap-1 mt-5 ml-auto flex">
        <input
          className="p-2 rounded-md "
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-slate-200 p-2 rounded-lg " onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="flex gap-3 p-3 flex-wrap">
        {searchTerm
          ? searchResults.map((book) => (
              <BookItem key={book.book_id} book={book} />
            ))
          : books.map((book) => <BookItem key={book.book_id} book={book} />)}
      </div>
    </div>
  );
}
