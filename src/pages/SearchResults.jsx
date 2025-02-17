import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const { query } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://gutendex.com/books?search=${query}`);
        setBooks(response.data.results);
      } catch (err) {
        setError("Kunne ikke hente bøker.");
      }
      setLoading(false);
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="search-results-container">
      <h1 className="search-title">Søkeresultater for: "{query}"</h1>
      {loading && <p className="loading">Laster bøker...</p>}
      {error && <p className="error">{error}</p>}
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <Link to={`/book/${book.id}`} className="book-link">
              <img src={book.formats["image/jpeg"]} alt={book.title} className="book-cover" />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Av {book.authors.map((a) => a.name).join(", ")}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

