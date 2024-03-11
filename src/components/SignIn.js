import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config"; 
import '../css/index.css';
import Navbar from "./Navbar";

const SignIn = () => {
  // const { signIn } = useContext(UserContext);
  const { signIn, currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const [validation, setValidation] = useState("");

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await signIn(inputs.current[0].value, inputs.current[1].value);
      setValidation("");
      // La redirection basée sur le rôle sera gérée après la récupération du rôle de l'utilisateur
    } catch {
      setValidation("L'email ou le mot de passe est incorrect");
    }
  };

  // Récupération du rôle de l'utilisateur après connexion réussie
  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { role } = docSnap.data();
          role === "seller" ? navigate("/sellers") : navigate("/");
        } else {
          console.log("Aucun document trouvé !");
        }
      }
    };

    fetchUserRole();
  }, [currentUser, navigate]);

  return (
    <>
    <Navbar/>
      <div className="signin-container">
        <h1>Connexion</h1>
        <form ref={formRef} onSubmit={handleForm} className="signin-form">
          <div className="form-group">
            <label htmlFor="signInEmail">Adresse Email</label>
            <input ref={addInputs} name="email" required type="email" id="signInEmail" />
          </div>
          <div className="form-group">
            <label htmlFor="signInPwd">Mot de passe</label>
            <input ref={addInputs} name="pwd" required type="password" id="signInPwd" />
          </div>
          <p className="form-error">{validation}</p>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;


