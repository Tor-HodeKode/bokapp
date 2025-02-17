import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import FavoritesPage from "./pages/FavoritesPage";
import CategoryPage from "./pages/CategoryPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;

