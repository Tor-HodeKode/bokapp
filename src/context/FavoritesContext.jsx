import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Hent lagrede favoritter fra localStorage ved første innlasting
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Lagre favoritter i localStorage når de endres
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Legg til favorittbok
  const addFavorite = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  // Fjern favorittbok
  const removeFavorite = (bookId) => {
    setFavorites(favorites.filter((book) => book.id !== bookId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
