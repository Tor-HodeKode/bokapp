import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Kunne ikke laste inn bokdetaljer.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>🔄 Laster inn...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Fant ikke boken.</p>;

  const isFavorite = favorites.some((fav) => fav.id === book.id);

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.formats["image/jpeg"]} alt={book.title} />
      <p>Forfatter: {book.authors.map((a) => a.name).join(", ")}</p>
      <p>Språk: {book.languages.join(", ")}</p>
      <p>Antall nedlastninger: {book.download_count}</p>
      <a href={book.formats["text/html"]} target="_blank" rel="noopener noreferrer">
        📖 Les boken
      </a>
      <br />
      <button onClick={() => (isFavorite ? removeFavorite(book.id) : addFavorite(book))}>
        {isFavorite ? "❌ Fjern fra favoritter" : "⭐ Legg til i favoritter"}
      </button>
    </div>
  );
}

export default BookDetail;
