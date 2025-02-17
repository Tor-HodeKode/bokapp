import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorittbøker</h1>
      {favorites.length === 0 ? (
        <p>Ingen favoritter lagt til ennå.</p>
      ) : (
        <ul>
          {favorites.map((book) => (
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>
                <img src={book.formats["image/jpeg"]} alt={book.title} width="100" />
                <p>{book.title}</p>
              </Link>
              <button onClick={() => removeFavorite(book.id)}>❌ Fjern</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
