import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import Products from "../components/Products";
import Navbar from "../components/Navbar";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="wrapper">
      <Navbar user={currentUser} />
      <Products />
    </div>
  );
};

export default Home;
