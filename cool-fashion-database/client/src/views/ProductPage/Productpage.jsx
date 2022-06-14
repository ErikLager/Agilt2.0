import { useParams } from 'react-router-dom'
import styles from './Productpage.module.css'
import React, { useState, useEffect, useContext } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AddToWishlistButton from '../../components/Button/AddWishlistButton/AddToWishlistButton';
import { CartContext } from '../Cart/CartContext';



const Productpage = () => {

    const [productById, setProductById] = useState({
        name: "",
        description: "",
        price: "",
        pictures: [],
        categories: "",
        inStock: "",
    });
    const { id } = useParams();

    useEffect(() => {
        async function fetchProductbyId() {
            try {
                let response = await fetch(`http://localhost:5002/api/getproducts/${id}`);
                let data = await response.json();
                setProductById(data);
            } catch (error) {
                console.log("Something wrong with fetch");
            }
        }
        fetchProductbyId();
    },[]);

    const { cart, setCart } = useContext(CartContext);


    const addToCart = (productById) => {
        const same = cart.filter(item => item === productById);
        Object.assign(productById, {
          qty: same.length + 1,
        });
        setCart([...cart, productById]);
        console.log("CART:",cart);
      }


	return (
		<div className={styles.PPContainer}>
            <Carousel className={styles.PPCarousel}>
                <div>
                    <img src={productById.pictures[0]} alt=""/>
                </div>
                <div>
                    <img src={productById.pictures[1]} alt=""/>
                </div>
                <div>
                    <img src={productById.pictures[2]} alt=""/>
                </div>
            </Carousel>
          <div className={styles.PPRight}>
          <h2>{productById.name}</h2>
        <br />
        <br />
        <p></p>
        <p>Desciption: {productById.description}</p>
            <p>Price: {productById.price}</p>
            <a className={styles.PPButton}  onClick={() => addToCart(productById)}>
                Buy Now
            </a>
            <AddToWishlistButton/>
        </div>
    </div>
)}

export default Productpage;