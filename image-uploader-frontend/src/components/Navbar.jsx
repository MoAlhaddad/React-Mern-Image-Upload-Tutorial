import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when resizing above breakpoint
  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => setMenuOpen(prev => !prev);

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          Image Upload App
        </Link>
        <nav className={`header__content__nav ${menuOpen && size.width < 768 ? "isMenu" : ""}`}>
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            </li>
            <li>
              <Link to="/upload" className={location.pathname === "/upload" ? "active" : ""}>Upload</Link>
            </li>
          </ul>
        </nav>
        <div className="header__content__toggle" onClick={menuToggleHandler}>
          {!menuOpen ? <BiMenuAltRight /> : <AiOutlineClose />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
