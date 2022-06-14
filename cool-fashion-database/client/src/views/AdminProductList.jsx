import { Navigate } from 'react-router-dom'
import "./AdminProductlist.css";
import { useEffect, useState } from "react";
import { checkAuthentication } from '../hooks/auth'

const AdminProductList = () => {
    const [authenticated, setAuthenticated] = useState(null)
    const [waitingForAuth, setWaitingForAuth] = useState(true)
    const [newProduct, setNewProduct] = useState({});

    const [products, setProducts] = useState({});
    const [productToUpdate, setProductToUpdate] = useState({})
    const [categories, setCategories] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')

    function handleInput(e) {
        if (e.target.name === "pictures") {
            setNewProduct({ ...newProduct, [e.target.name]: [e.target.value] })
        }
        if (e.target.type === "checkbox") {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.checked })
        }
        else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        }
    }
    
    function handleTableInput(e) {
        if (e.target.name === "pictures") {
            setProductToUpdate({ ...newProduct, [e.target.name]: [e.target.value] })
        }
        if (e.target.type === "checkbox") {
            setProductToUpdate({ ...newProduct, [e.target.name]: e.target.checked })
        }
        else {
            setProductToUpdate({ ...newProduct, [e.target.name]: e.target.value })
        }
    }
    
    async function checkAuthentication() {
        console.log('Checking!')
        try {
            const res = await fetch(`/api/authenticated`)
            if (res.status !== 401) {
                const data = await res.json()
                setAuthenticated(data)
            } else {
                setWaitingForAuth(false)
                throw 'You are not logged in!'
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }
    
    async function getCategories() {
        try {
            const res = await fetch('/api/getcategories')
            if (res.status !== 401) {
                const data = await res.json()
                setCategories(data)
                console.log(data)
            } else {
                throw 'Could not fetch categories!'
            }
        } catch(error) {
            console.error('Error: ', error)
        }
    }
    
    useEffect(() => {
        checkAuthentication()
        getCategories()
    }, [])
    
    useEffect(() => {
        if (authenticated) {
            setWaitingForAuth(false)
            console.log('checking auth')
            console.log(authenticated)         
        }
    }, authenticated)

    async function addProdToDB(prodData) {
        const res = await fetch("http://localhost:5002/api/newproduct", {
            method: "POST",
            body: JSON.stringify({
                name: prodData.name,
                inStock: prodData.inStock,
                description: prodData.description,
                price: prodData.price,
                pictures: prodData.pictures,
                categories: prodData.categories,
                isFeatured: prodData.isFeatured,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await res.json();
    }

    const addnewproduct = (e) => {
        e.preventDefault();
        addProdToDB(newProduct);
    }

    const getProduct = async () => {
        const res = await fetch("http://localhost:5002/api/getproducts");
        const productlist2 = await res.json();
        console.log("-------------get all products-------------");
        setProducts(productlist2);
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            {waitingForAuth && <p>Loading...</p>}
            {!waitingForAuth && (
                <div>
                {!authenticated && <Navigate to='/' />}
                {(authenticated && categories.categories.length > 0) && (
                <>
                <h1>List of all the products</h1>
                <table>
                <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            In Stock
                        </th>
                        <th>
                            Featured
                        </th>
                        <th>
                            Images
                        </th>
                        <th>
                            Update
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {products.products && (
                        products.products.map((item, index) => {
                            return (
                                <>
                                {selectedProduct._id === item._id && (
                                    <tr key={index} className="item selected-product">
                                        <td>
                                            {selectedProduct._id}
                                        </td>
                                        <td>
                                            <input type="text" defaultValue={selectedProduct.name} />
                                        </td>
                                        <td>
                                            <input type="text" defaultValue={selectedProduct.description} />
                                        </td>
                                        <td>
                                            <p>{selectedProduct.categories}</p>
                                            <select name="category" id="category">
                                                <option value="">--Please choose an option--</option>
                                                {categories.categories.map(category => {
                                                    return (
                                                        <>
                                                            {category.name === selectedProduct.categories && (
                                                                <option key={category._id} value={category.name} selected>
                                                                    {category.name}
                                                                </option>        
                                                            )}
                                                            {category.name !== selectedProduct.categories && (
                                                                <option key={category._id} value={category.name}>
                                                                    {category.name}
                                                                </option>     
                                                            )}
                                                        </>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        <td>
                                            <input type="checkbox" defaultChecked={item.inStock} />
                                        </td>
                                        <td>
                                            <input type="checkbox" defaultChecked={item.isFeatured} />
                                        </td>
                                        <td>
                                            <input type="text" rows="4" defaultValue=
                                                {
                                                    item.pictures.map((item) => {
                                                        return `${item} \n`
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => setSelectedProduct(item._id)}>Update</button>
                                        </td>
                                    </tr>
                                )}
                                {selectedProduct._id !== item._id && (
                                    <tr key={index} className="item">
                                        <td>
                                            {item._id}
                                        </td>
                                        <td>
                                            <p>{item.name}</p>
                                        </td>
                                        <td>
                                            <p>{item.description}</p>
                                        </td>
                                        <td>
                                            <p>{item.categories}</p>
                                        </td>
                                        <td>
                                            <input type="checkbox" defaultChecked={item.inStock} disabled />
                                        </td>
                                        <td>
                                            <input type="checkbox" defaultChecked={item.isFeatured} disabled />
                                        </td>
                                        <td>
                                                {
                                                    item.pictures.map((item) => {
                                                        return <span className='product-list-images-text'>image </span>
                                                    })
                                                }
                                        </td>
                                        <td>
                                            <button onClick={() => setSelectedProduct(item)}>Update</button>
                                        </td>
                                    </tr>
                                )}
                                    </>
                            )
                        })
                    )}

                </tbody>
            </table>

            <form onSubmit={addnewproduct}>
                <label>name</label>
                <input onChange={handleInput} name="name" /><br />
                <label>description</label>
                <input onChange={handleInput} name="description" /><br />
                <label>Category</label>
                <input onChange={handleInput} name="categories" /><br />
                <label>in Stock</label>
                <input onChange={handleInput} name="inStock" type="checkbox" /><br />
                <label>featured</label>
                <input onChange={handleInput} name="isFeatured" type="checkbox" /><br />
                <label>Price</label>
                <input onChange={handleInput} name="price" /><br />
                <label>images</label>
                <input onChange={handleInput} name="pictures" /><br />

                <button>Add new product</button>

            </form>
            </>
        )}
        </div>
        )}
    </>
    )
};

export default AdminProductList;