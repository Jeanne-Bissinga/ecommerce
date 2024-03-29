import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AddProducts from "./components/AddProducts";
import Cart from "./components/Cart";
import { auth, db } from "./firebase-config";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Sellers from "./pages/Sellers";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async(user) => {
      if (user) {
        const refCollection = doc(db, "users", user.uid);
        const snapshot = await getDoc(refCollection, user.uid)
        setUser(snapshot.data().email) 
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener(); // Arrête l'écoute de l'authentification lorsque le composant est démonté
    };
  }, []);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/sellers" element={<Sellers user={user} />} />
      </Routes>
    </>
  );
}

export default App;
