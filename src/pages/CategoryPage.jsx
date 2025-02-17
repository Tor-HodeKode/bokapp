import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryPage() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://gutendex.com/books?topic=${category}`);
        setBooks(response.data.results);
      } catch (err) {
        setError("Kunne ikke hente bøker. Prøv igjen senere.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [category]);

  if (loading) return <p>🔄 Laster inn bøker...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (books.length === 0) return <p>Ingen bøker funnet i denne kategorien.</p>;

  return (
    <div>
      <h2>Bøker i kategorien: {category}</h2>
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

export default CategoryPage;
