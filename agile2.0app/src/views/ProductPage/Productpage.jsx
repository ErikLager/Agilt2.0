import { Link } from 'react-router-dom'
import styles from './Productpage.module.css'
import React, { useState, Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';




// npm i react-responsive-carousel
//Lägg till en carousel bild med en <div> med en Img tag i
const Productpage = () => {

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
            <p>Price: Price goes here</p>
            <p>Stock: True/false</p>
            <a className={styles.PPButton} href="">
                Buy Now
            </a>
        </div>
    </div>
	)
}

export default Productpage;