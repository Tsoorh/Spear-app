import { useEffect, useState } from "react";
import { IconsBasket } from "./IconsBasket";
import { useWindowSize } from "../customHooks/useWindowSize";
import { Link, NavLink, useNavigate } from "react-router";

export function AppHeader() {
  // let vpWidth = window.innerWidth;
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [isBigScreen, setIsBigScreen] = useState(width > 780);
  const [isMenuOpen,setIsMenuOpen] =useState(false);


  useEffect(() => {
    width > 780 ? setIsBigScreen(true) : setIsBigScreen(false);
  }, [width]);

  function toggleMenu() {
    setIsMenuOpen(prev => !prev)
  }


  if (isBigScreen) {
    return (
      <div className="app-header flex space-between align-center">
        <Link to="/">
        <img
          src="../src/assets/img/full-logo.png"
          alt="spearo-logo"
          id="logo"
          onClick={()=>navigate("/")}
          />
          </Link>
        <ul className="flex nav-header">
        {/* <li><NavLink to="/gallery">Gallery</NavLink></li> */}
        {/* <li><NavLink to="/Forecast">Forecast</NavLink></li> */}
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        </ul>
      </div>
    );
  }
  return (
    <div className="app-header flex space-between align-center">
      <Link to="/">
      <img src="../src/assets/img/small-logo.png" alt="spearo-logo" id="logo" />
      </Link>
      <div className={`flex menu-svg ${isMenuOpen?'active-menu':''}`} onClick={toggleMenu}>
      <IconsBasket iconName={"menu"} />
      </div>
    </div>
  );
}
