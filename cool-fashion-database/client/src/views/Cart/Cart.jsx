import styles from './Cart.module.css'
import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { CartContext } from './CartContext';
import useRemoveArrayDuplicates from '../../hooks/useRemoveArrayDuplicates';





const Cart = (props) => {
    const { isCart = true } = props;

    const { cart, setCart } = useContext(CartContext)
    const filteredCart = useRemoveArrayDuplicates(cart);

    const priceArray = cart.map((p)=> p.price);

    const removeProduct = (id) => {
        setCart([...cart].filter((prod) => prod.id !== id));
      };


	return (
        <>
        {isCart && (
        <div className={styles.CartContainer}>

            {cart.length <= 0 && (
                <p>This cart is empty, buy something!</p>
                )}
                {cart.length > 0 &&
                filteredCart.map((prod) =>(
                    <div key={prod.id}>
            <div className={styles.CartProducts} >
            <img src={prod.pictures[0]}/>
                <ul>
                    <li>
                        {prod.name}
                    </li>
                    <li>
                        {prod.price} Kr
                    </li>
                    <li>
                        <button type='button' onClick={() => removeProduct(prod.id)}>Remove from cart</button>
                    </li>
                </ul>
            </div>
            <div className={styles.CartCheckout}>
                <p>Total price:{" "}
                {priceArray.length >0 
                ? priceArray.reduce((total, price) => total + price)
                : "0"}{" "}</p>
                </div>
            </div>))}
        </div>
        )}
        </>
    )}

export default Cart;