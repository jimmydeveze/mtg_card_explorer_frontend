import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          MTG Card Explorer
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/cards" className="header__link">
            Cards
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
