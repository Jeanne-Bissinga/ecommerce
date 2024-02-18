import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config"; 
import { collection, getDocs } from "firebase/firestore";


export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // Nouvel état pour le panier

    useEffect(() => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, "Products"));
          const productsArray = [];
          querySnapshot.forEach((doc) => {
                    productsArray.push({
                    ProductID: doc.id,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImage: doc.data().ProductImage
                });
            });
            setProducts(productsArray);
        };

        fetchData();
    }, []); // Exécute l'effet uniquement lors du premier rendu

    // Fonction pour ajouter des produits au panier
    const addToCart = (product) => {
        setCart(currentCart => [...currentCart, product]);
    };

    return (
        <ProductsContext.Provider value={{ products, cart, addToCart }}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;
