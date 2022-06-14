import styles from "./ProdCard.module.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistButton from "./Button/WishlistButton/WishlistButton";





const ProductCard = () => {
    const url = 'http://localhost:5002/api/getproducts';
    const [products, setProducts] = useState([]);
    useEffect(() => {
    async function fetchAllProducts() {
        try {
            let response = await fetch(url);
            let data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.log("Something wrong with fetch");
        }
    }

    fetchAllProducts();
},[]);


    return (
        <>
        <div class={styles.content}>
            { products.map((product) => (
                <Link to={`/${product._id}`} className={styles.prodCard}>
                <img className={styles.prodimg} src={product.pictures[0]} />
                <p className={styles.prodCardP}>{product.name}</p>
            </Link>
            ))}
            
            </div>
        </>
    )
};

export default ProductCard;