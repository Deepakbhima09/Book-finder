import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-image">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} />
        ) : (
          <div className="no-cover">No cover available</div>
        )}
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author_name}</p>
        <p><strong>Year:</strong> {book.first_publish_year}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <a href={book.details_url} target="_blank" rel="noopener noreferrer" className="details-link">
          Details
        </a>
      </div>
    </div>
  );
};

export default BookCard;
