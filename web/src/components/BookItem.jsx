import React from "react";
import { useSelector } from "react-redux";

export default function BookItem({ book }) {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  // console.log(book);
  const handleBorrow = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/borrow-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book_id: book.book_id,
            user_id: currentUser.user_id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReturn = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/return-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book_id: book.book_id,
            user_id: currentUser.user_id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg w-full sm:w-[200px] h-[250px] p-4 bg-slate-400">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Availability: {book.availability ? "Available" : "Borrowed"}</p>
      {book.availability ? (
        <button className="bg-green-600 rounded-sm p-1" onClick={handleBorrow}>
          Borrow
        </button>
      ) : (
        <button className="bg-red-400 rounded-sm p-1" onClick={handleReturn}>
          Return
        </button>
      )}
    </div>
  );
}
