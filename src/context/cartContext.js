import React, {createContext, useReducer, useEffect} from "react";
import { CartReducer } from "../components/CartReducer";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase-config";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cart, dispatch] = useReducer(CartReducer, {shoppingCart: [], totalPrice: 0, totalQty: 0});

    // Stockage du panier sur firebase
    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const saveCartToFirebase = async () => {
                const cartRef = doc(db, "UserCarts", userId);
                await setDoc(cartRef, { ...cart }, { merge: true });
            };
            saveCartToFirebase();
        }
    }, [cart]);
    
    return(
        <CartContext.Provider value={{ ...cart, dispatch}}>
            {props.children}
        </CartContext.Provider>
    )
}