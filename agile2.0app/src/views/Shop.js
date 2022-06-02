import ProductCard from "../components/ProductCard";

import { useEffect, useState } from "react";


const url = 'http://localhost:5002/api/getproducts';

const Shop = () => {
    const [products, setProducts] = useState([]);


useEffect(() => {
    async function fetchAllProducts() {
        try {
            let response = await fetch(url);
            let data = await response.json();
            setProducts(data.products);
            console.log("Products",products);
        } catch (error) {
            console.log("Something wrong with fetch");
        }
    }
    fetchAllProducts();
},[]);

    return (
        <>
            <ProductCard>
                {products.map((product) => (
                    <p key={product.name} product={product.name}></p>
                ))}
            </ProductCard>
        </>
    )
};

export default Shop;