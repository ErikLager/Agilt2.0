import { useParams } from 'react-router-dom'
import styles from './Productpage.module.css'
import React, { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Button from '../../components/Button/Button'




const Productpage = () => {

    const [productById, setProductById] = useState({
        name: "",
        description: "",
        price: "",
        pictures: [],
        categories: "",
        inStock: false,
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

    console.log("Prod",productById);
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
            {productById.inStock && (
                <a className={styles.PPButton} href="">
                    Buy Now
                </a>
            )}
            {!productById.inStock && (
                <button disabled>NOT IN STOCK</button>
            )}
        </div>
    </div>
)}

export default Productpage;