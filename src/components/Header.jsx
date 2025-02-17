import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Fiction", "Mystery", "Thriller", "Romance", "Fantasy",
  "Morality", "Society", "Power", "Justice", "Adventure",
  "Tragedy", "War", "Philosophy"
];

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header">
      <h1>
        <Link to="/">📚 BokApp</Link>
      </h1>
      <nav>
        <Link to="/">Hjem</Link>
        <Link to="/favorites">⭐ Favoritter</Link>
        <div
          className="category-menu"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="category-button">Kategorier ⬇</button>
          {isDropdownOpen && (
            <div className="category-dropdown">
              {categories.map((category) => (
                <Link key={category} to={`/category/${category.toLowerCase()}`}>
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;


