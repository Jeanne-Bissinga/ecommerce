import React, { useContext } from 'react';
import { ProductsContext } from '../context/productsContext';
import { CartContext } from '../context/cartContext';

const Products = () => {
    // Utiliser `addToCart` à partir du contexte
    const { products, addToCart } = useContext(ProductsContext);

    // const data = useContext(CartContext)
    // console.log(data);

    const {dispatch} = useContext(CartContext)

    return (
        <>
            {products.length !== 0 && <h1>Produits</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>Pas de produits</div>}
                {products.map(product => (
                    <div className="product-card" key={product.ProductID}>
                        <div className="product-img">
                            <img src={product.ProductImage} alt={product.ProductName} />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className="product-price">
                            {product.ProductPrice}.00$
                        </div>
                        <div>
                            <button onClick={()=>{dispatch({type: 'ADD_TO_CART', id: product.ProductID, product})}} className='addcart-btn'>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
