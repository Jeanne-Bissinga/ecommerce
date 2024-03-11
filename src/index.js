import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductsContextProvider from "./context/productsContext";
import { UserContextProvider } from "./context/userContext";
import { CartContextProvider } from "./context/cartContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <UserContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <App />            
          </CartContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>{" "}
    </BrowserRouter>
);
