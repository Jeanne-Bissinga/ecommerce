// Ici on met tout ce qui est lier à la connexion avec firebase mais aussi les modals
import { createContext, useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../firebase-config";
// Méthodes qui serviront a créer un utilisateur, s'inscrire et modifier
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const signUp = async (email, pwd, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { email, role });
  };

  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingData(false);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ signUp, signIn, currentUser }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}

