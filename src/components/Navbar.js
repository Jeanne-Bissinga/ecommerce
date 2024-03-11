import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth} from "../firebase-config";
import "../css/index.css";
import { CartContext } from "../context/cartContext";

const Navbar = ({ user }) => {
  const { totalQty } = useContext(CartContext);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert("Erreur...");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2>Ecommerce</h2>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Si l'utilisateur n'est pas connecter */}
        {!user && (
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signin"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Se connecter
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signup"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  S'inscrire
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/cart"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  <i className="bi bi-cart-fill"></i>
                </Link>
              </li>
              <div className="relative">
                <li className="no-of-products">{totalQty}</li>
              </div>
            </ul>
          </div>
        )}

        {/* Quand l'utilisateur est connecter */}
        {user && (
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-link">{user.email}</li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout" onClick={logOut}>
                  Se déconnecter
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/cart"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  <i className="bi bi-cart-fill"></i>
                </Link>
              </li>
              <div className="relative">
                <li className="no-of-products">{totalQty}</li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import React, {useContext} from 'react';
// import { UserContext } from '../context/userContext';
// import { Link } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebase-config';

// const Navbar = () => {
//     const {toggleModals} = useContext(UserContext)
//     const navigate = useNavigate()
//     const logOut = async () => {
//         try {
//             await signOut(auth)
//             navigate("/")
//         } catch {
//             alert("Erreur...")
//         }
//     }

//     return (
//         <nav className="navbar navbar-light bg-light px-4">
//             <Link to="/" className='navbar-brand'> Ecommerce </Link>

//             <div>
//                 <button onClick={() => toggleModals("signIn")}className='btn btn-primary'> Se connecter </button>
//                 <button onClick={() => toggleModals("signUp")} className='btn btn-primary ms-2'>S'inscrire </button>
//                 <button onClick= {logOut} className='btn btn-danger ms-2'> Se déconnecter </button>
//             </div>
//         </nav>

//     );
// };

// export default Navbar;
