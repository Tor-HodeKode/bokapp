import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const fetchBooks = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://gutendex.com/books/?search=${searchQuery}&page=${page}`
      );
      setBooks(response.data.results);
      setNextPage(response.data.next); // Sjekker om det er flere sider
    } catch (err) {
      setError("Kunne ikke hente bøker. Prøv igjen!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, page]);

  return (
    <div>
      <h1>Søk meg</h1>
      <input
        type="text"
        placeholder="Søk Etter Bøker!"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1); // Tilbakestill til side 1 ved nytt søk
        }}
      />
      {loading && <p>Laster inn...</p>}
      {error && <p>{error}</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <img src={book.formats["image/jpeg"]} alt={book.title} width="100" />
              <p>{book.title}</p>
              <p>Forfatter: {book.authors.map((a) => a.name).join(", ")}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Paginering */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Forrige side
        </button>
        <button disabled={!nextPage} onClick={() => setPage(page + 1)}>
          Neste side
        </button>
      </div>
    </div>
  );
}

export default Home;

