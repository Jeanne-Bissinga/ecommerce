import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Private from "./pages/private/Private";
import PrivateHome from "./pages/private/privateHome/PrivateHome";
import AddProducts from "./components/AddProducts";
import ProductsContextProvider from "./context/productsContext";
import { UserContextProvider } from "./context/userContext";
import PrivateBuyer from "./pages/private/privateHome/PrivateBuyer";
import { CartContextProvider } from "./context/cartContext";
import Cart from "./components/Cart";

function App() {
  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/addproducts" element={<AddProducts />} />
              <Route path="/cart" element={<Cart />} />

              {/* Définition de la route /private et sous-route /private/private-home */}
              <Route path="/private" element={<Private />}>
                <Route path="private-home" element={<PrivateHome />} />
                <Route path="private-buyer" element={<PrivateBuyer />} />
              </Route>
            </Routes>
          </>
        </CartContextProvider>
      </ProductsContextProvider>
    </UserContextProvider>
  );
}

export default App;
