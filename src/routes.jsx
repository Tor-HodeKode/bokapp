import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BookDetail from "./pages/BookDetails";
import CategoryPage from "./pages/CategoryPage";
import Favorites from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book/:id",
    element: <BookDetail />,
  },
  {
    path: "/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

export default router;
