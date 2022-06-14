import styles from "./ProdCard.module.css"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WishlistButton from "./Button/WishlistButton/WishlistButton";


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
            <Link to={`/${product._id}`} className={styles.prodCard} key={product.id}>
              <img className={styles.prodimg} src={product.pictures[0]} />
              <p className={styles.prodCardP}>{product.name}</p>
            </Link>
          ))}
        </div>
      </>
    )}
    {location.state && (
      <>
        <p style={{padding: '1rem'}}>You searched for: {location.state.searchData}</p>
        <div class={styles.content}>
          { location.state.data.map((product) => (
            <Link to={`/${product._id}`} className={styles.prodCard} key={product.id}>
              <img className={styles.prodimg} src={product.pictures[0]} />
              <p className={styles.prodCardP}>{product.name}</p>
            </Link>
          ))}
        </div>
      </>
    )}
    </>    
  )
};

export default ProductCard;