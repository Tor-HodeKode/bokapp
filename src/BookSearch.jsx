import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://gutendex.com/books?search=${query}`);
        setBooks(response.data.results);
      } catch (err) {
        setError("Kunne ikke hente bøker. Prøv igjen senere.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div>
      {/* Søkefeltet plassert øverst */}
      <div className="search-container">
        <input
          id="book-search-input"
          type="text"
          placeholder="Søk etter bøker..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>🔄 Laster inn bøker...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && books.length === 0 && <p>Ingen bøker funnet.</p>}

      {/* Grid-visning av bøker */}
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <Link to={`/book/${book.id}`}>
              <img src={book.formats["image/jpeg"]} alt={book.title} />
              <h3>{book.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;


