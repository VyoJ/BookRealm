import React, { useContext, useState } from 'react';
import './navbar.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../../app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from "firebase/auth";
import fire from '../../../firebase/Firebase.js';

export default function Navbar({ darkTheme, darkTextTheme }) {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const auth = getAuth(fire);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('logout successful');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={darkTheme ? 'background-dark navbar-container relative' : 'background-transparent navbar-container'}>
      <div className="container flex justify-between align-center">
        <Link to="/" className="logo">Book<span className="text-primary">Realm</span></Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>

        <nav className={`nav-link-container ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}>Home</Link>
          <Link to="/books" className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}>Books</Link>
          {user ?
            <>
              <Link onClick={handelLogout} to="/" className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}>Logout</Link>
              <Link to="/cart" className={`${darkTextTheme ? "nav-links-dark cart-link" : "nav-links cart-link"} `}><FontAwesomeIcon icon={faCartShopping} /></Link>
            </>
            :
            <>
              <Link to="/login" className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}>Login</Link>
              <Link to="/signup" className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}>Sign up</Link>
            </>
          }
        </nav>

      </div>
    </section>
  )
}