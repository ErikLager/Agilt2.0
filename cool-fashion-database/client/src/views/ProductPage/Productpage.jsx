import { useParams } from 'react-router-dom'
import styles from './Productpage.module.css'
import React, { useState, Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';




const Productpage = () => {

    const [product, setProduct] = useState({
        productname: "",
        description: "",
        price: "",
        pictures: [],
        categories: "",
        inStock: "",
    });
    const params = useParams();

    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch (`http://localhost:5002/api/getproducts/${params._id.toString()}`);

            if (!response.ok) {
                const message = `ERROR ERROR: ${response.statusText}`;
                console.log(">>>>>>>>>",message);
                return;
            }
        }
        fetchProduct();
        return;
    }, [params._id]);



// npm i react-responsive-carousel
//Lägg till en carousel bild med en <div> med en Img tag i
	return (
		<div className={styles.PPContainer}>
            <Carousel className={styles.PPCarousel}>
                <div>
                <img className={styles.PPImg} src='https://ginatricotpc.imgix.net/pim/product-images/861605104/86160510405.jpg?auto=format,compress'/>
                </div>
                <div>
                <img className={styles.PPImg} src="https://ginatricotpc.imgix.net/pim/product-images/861605104/86160510405.jpg?auto=format,compress"/>
                </div>
            </Carousel>
          <div className={styles.PPRight}>
          <h2>Productname</h2>
        <br />
        <br />
        <p></p>
            <p>Price: </p>
            <p>Stock: </p>
            <a className={styles.PPButton} href="">
                Buy Now
            </a>
        </div>
    </div>
	)
}

export default Productpage;