import styles from "./ProdCard.module.css"
import { useEffect, useState } from "react";



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
console.log("Products utanför",products);
    return (
        <>
        <div class={styles.content}>
            { products.map((product) => (
                <a href="#" className={styles.prodCard} key={product.id}>
                <img className={styles.prodimg} src={product.pictures[0]} />
                <p className={styles.prodCardP}>{product.name}</p>
            </a>
            ))}
            </div>
        </>
    )
};

export default ProductCard;