import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import AddProducts from "../components/AddProducts";

import { UserContext } from "../context/userContext";

const Sellers = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="wrapper">
      <Navbar user={currentUser} />
      <AddProducts />
    </div>
  );
};

export default Sellers;
