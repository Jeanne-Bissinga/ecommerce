import React, { useContext } from 'react';
import {CartContext} from "../context/cartContext";
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link} from 'react-router-dom'; 
import { UserContext } from '../context/userContext';
import '../css/index.css';


const Cart = ({ user }) => {
    const { currentUser } = useContext(UserContext);

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    return (
        <>
        <Navbar user={currentUser}/>
            <>
                {shoppingCart.length !== 0 && <h1>Votre panier </h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>Votre panier est vide</div>
                            <div><Link to="/"> Retourner aux articles</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt=" " />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>PU {cart.ProductPrice}.00 </div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                Prix: {cart.TotalProductPrice}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))}
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Détails de la commande
                        </div>
                        <div className='cart-summary-price'>
                            <span>Prix total </span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Quantité: </span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: '5px' }}>
                                Payer
                            </button>
                        </Link>
                    </div>}
                </div>
            </>
        </>
    );
};

export default Cart;
