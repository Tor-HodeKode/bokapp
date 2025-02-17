import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div>
      <h1>⭐ Favorittbøker</h1>
      {favorites.length === 0 ? <p>Ingen favoritter ennå.</p> : null}
      <div className="book-grid">
        {favorites.map((book) => (
          <div key={book.id} className="book-card">
            <Link to={`/book/${book.id}`}>
              <img src={book.formats["image/jpeg"]} alt={book.title} />
              <h3>{book.title}</h3>
            </Link>
            <button onClick={() => removeFavorite(book.id)}>❌ Fjern</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
