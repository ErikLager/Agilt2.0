import styles from "./ProdCard.module.css"
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

const ProductCard = ({ searchResults }) => {
  const url = 'http://localhost:5002/api/getproducts';
  const [products, setProducts] = useState([]);
  const location = useLocation();
  
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
  
  console.log("Products utanför", products);
  
  return (
    <>
    {!location.state && (
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
    )}
    {location.state && (
      <>
        <p style={{padding: '1rem'}}>You searched for: {location.state.searchData}</p>
        <div class={styles.content}>
          { location.state.data.map((product) => (
            <a href="#" className={styles.prodCard} key={product.id}>
              <img className={styles.prodimg} src={product.pictures[0]} />
              <p className={styles.prodCardP}>{product.name}</p>
            </a>
          ))}
        </div>
      </>
    )}
    </>    
  )
};

export default ProductCard;