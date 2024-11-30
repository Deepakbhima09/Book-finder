import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery === "") {
      setFilteredBooks([]);
      return;
    }
    setLoading(true);
    const apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const books = data.docs.map((book) => ({
          title: book.title,
          author_name: book.author_name ? book.author_name[0] : "Unknown",
          first_publish_year: book.first_publish_year,
          publisher: book.publisher ? book.publisher[0] : "Unknown",
          cover_url: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          details_url: `https://openlibrary.org${book.key}`,
        }));
        setFilteredBooks(books);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Book Finder</h1>
        <div className="logo">📚</div>
        <p>Search for any book you'd like to explore</p>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="book-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        ) : (
          <p>{query ? "No results found" : "Search for books above!"}</p>
        )}
      </div>
    </div>
  );
}

export default App;
