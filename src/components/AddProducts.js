import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore'; 
import '../css/index.css';


const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"]; // types d'images valides

  // Handler pour les images
  const productImageHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImage(selectedFile);
      setError("");
    } else {
      setProductImage(null);
      setError("Veuillez sélectionner un format d'image valide (PNG ou JPEG).");
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `product-images/${productImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, productImage);
  
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, (err) => {
      setError(err.message);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const productRef = doc(db, 'Products', productImage.name); // Utilisez une clé unique pour le nom du document
        setDoc(productRef, {
          ProductName: productName,
          ProductPrice: Number(productPrice),
          ProductImage: downloadURL,
        }).then(() => {
          setProductName("");
          setProductPrice(0);
          setProductImage(null);
          setError("");
          document.getElementById('product-image').value = "";
        }).catch(err => setError(err.message));
      });
    });
  };

  return (
    <div className='container'>
      <h2>Ajout de produits</h2>
      <form onSubmit={addProduct} className='form-group'>
        <label htmlFor="product-name">Nom du produit</label>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          type="text"
          className='form-control'
          id="product-name"
          required
        />
        <label htmlFor="product-price">Prix du produit</label>
        <input
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          type="number"
          className='form-control'
          id="product-price"
          required
        />
        <label htmlFor="product-image">Photo du produit</label>
        <input
          onChange={productImageHandler}
          type="file"
          className='form-control'
          id='product-image' // Assurez-vous que cet ID correspond à celui utilisé dans le handler
          required
        />
        <button type="submit" className='btn btn-success btn-md'>Ajouter</button>
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};

export default AddProducts;
