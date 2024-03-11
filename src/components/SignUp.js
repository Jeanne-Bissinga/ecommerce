import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase-config"; 
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebase-config"; 
import "../css/index.css";
import Navbar from "./Navbar";

const SignUp = () => {
  const signUp = async (email, pwd, role) => {
    // Création de l'utilisateur avec Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
    const user = userCredential.user;
    
    // Stockage du rôle de l'utilisateur dans Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email, // stockahe de l'email
      role: role,
    });
  };
  

  // const { signUp } = useContext(UserContext);
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
    
    const role = inputs.current[0].value; 
    const email = inputs.current[1].value;
    const password = inputs.current[2].value;
    
    if (password.length < 6) {
      setValidation("Le mot de passe doit contenir 6 caractères minimum");
      return;
    } else if (password !== inputs.current[3].value) { 
      setValidation("Les mots de passe ne correspondent pas");
      return;
    }
  
    try {
      await signUp(email, password, role); // Inclure le rôle ici
      formRef.current.reset();
      setValidation("");
      // Redirection basée sur le rôle
      navigate("/signin")
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Le format de l'email est invalide");
      } else if (err.code === "auth/email-already-in-use") {
        setValidation("L'utilisateur existe déjà");
      }
    }
  };

  return (
    <>
        <Navbar/>

      <div className="signup-container">
        <h1>Inscription</h1>
        <form ref={formRef} onSubmit={handleForm} className="signup-form">
          <div className="form-group">
            <label htmlFor="role">Sélectionnez un rôle</label>
            <select
              ref={addInputs}
              name="role"
              id="role"
              className="form-control"
              required
            >
              <option value="seller">Vendeur</option>
              <option value="buyer">Acheteur</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="signUpEmail">Adresse Email</label>
            <input
              ref={addInputs}
              name="email"
              required
              type="email"
              id="signUpEmail"
            />
          </div>
          <div className="form-group">
            <label htmlFor="signUpPwd">Mot de passe</label>
            <input
              ref={addInputs}
              name="pwd"
              required
              type="password"
              id="signUpPwd"
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPwd">Confirmez le mot de passe</label>
            <input
              ref={addInputs}
              name="repeatPwd"
              required
              type="password"
              id="repeatPwd"
            />
          </div>
          <p className="form-error">{validation}</p>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
