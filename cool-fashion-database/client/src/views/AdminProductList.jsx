import { Navigate } from 'react-router-dom'
import "./AdminProductlist.css";
import { useEffect, useState } from "react";
import { checkAuthentication } from '../hooks/auth'
import AdminCreateCategory from './AdminCreateCategory/AdminCreateCategory'

const AdminProductList = () => {
    const [authenticated, setAuthenticated] = useState(null)
    const [waitingForAuth, setWaitingForAuth] = useState(true)
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        category: '',
        inStock: false,
        isFeatured: false,
        price: '',
        pictures: []
    });

    const [products, setProducts] = useState({});
    const [productToUpdate, setProductToUpdate] = useState({})
    const [categories, setCategories] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})

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
            setSelectedProduct({ ...selectedProduct, [e.target.name]: [e.target.value] })
        }
        if (e.target.type === "checkbox") {
            setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.checked })
        }
        else {
            setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value })
        }
    }
    
    async function checkAuthentication() {
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
                category: prodData.category,
                isFeatured: prodData.isFeatured,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await res.json();
        reloadPage()
    }
    
    async function deleteProduct(prodData) {
        const res = await fetch(`http://localhost:5002/api/deleteproduct/${prodData._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        reloadPage()
    }
    
    async function updateProductInDB(prodData) {
        console.log('Here')
        console.log(prodData)
        const res = await fetch(`http://localhost:5002/api/updateproduct/${prodData._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                _id: prodData._id,
                name: prodData.name,
                inStock: prodData.inStock,
                description: prodData.description,
                price: prodData.price,
                pictures: prodData.pictures,
                category: prodData.category,
                isFeatured: prodData.isFeatured,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        reloadPage()
    }
    
    function reloadPage() {
        setSelectedProduct({})
        setNewProduct({
            name: '',
            description: '',
            category: '',
            inStock: false,
            isFeatured: false,
            price: '',
            pictures: []
        })
        getProducts()
    }

    const addnewproduct = (e) => {
        e.preventDefault();
        addProdToDB(newProduct);
    }
    

    const getProducts = async () => {
        const res = await fetch("http://localhost:5002/api/getproducts");
        const productlist2 = await res.json();
        setProducts(productlist2);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            {waitingForAuth && <p>Loading...</p>}
            {!waitingForAuth && (
                <div style={{ padding: '1rem'}}>
                {!authenticated && <Navigate to='/' />}
                {(authenticated && categories.categories) && (
                <>
                <h1>List of all the products</h1>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>In Stock</th>
                        <th>Featured</th>
                        <th>Images</th>
                        <th>Update</th>
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
                                            <input
                                                onChange={handleTableInput}
                                                type="text"
                                                defaultValue={selectedProduct.name}
                                                name='name'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                onChange={handleTableInput}
                                                defaultValue={selectedProduct.description}
                                                name='description'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                onChange={handleTableInput}
                                                defaultValue={selectedProduct.price}
                                                name='price'
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="category"
                                                id="category"
                                                onChange={handleTableInput}
                                            >
                                                <option value="">--Please choose an option--</option>
                                                {categories.categories.map(category => {
                                                    return (
                                                        <>
                                                            {category.name === selectedProduct.category && (
                                                                <option key={category._id} value={category.name} selected>
                                                                    {category.name}
                                                                </option>        
                                                            )}
                                                            {category.name !== selectedProduct.category && (
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
                                            <input
                                                type="checkbox"
                                                defaultChecked={item.inStock}
                                                onChange={handleTableInput}
                                                name='inStock'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                defaultChecked={item.isFeatured}
                                                onChange={handleTableInput}
                                                name='isFeatured'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name='pictures'
                                                onChange={handleTableInput}
                                                type="text"
                                                rows="4"
                                                defaultValue= {
                                                    item.pictures.map((item) => {
                                                        return `${item} \n`
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <button
                                                style={{backgroundColor: 'lightgreen'}}
                                                onClick={() => updateProductInDB(selectedProduct)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                style={{backgroundColor: 'red', color: 'white'}}
                                                onClick={() => deleteProduct(selectedProduct)}
                                            >
                                                Delete
                                            </button>
                                            
                                        </td>
                                    </tr>
                                )}
                                {selectedProduct._id !== item._id && (
                                    <tr key={index} className="item">
                                        <td>
                                            <p>{item.name}</p>
                                        </td>
                                        <td>
                                            <p>{item.description}</p>
                                        </td>
                                        <td>
                                            <p>{item.price}</p>
                                        </td>
                                        <td>
                                            <p>{item.category}</p>
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
            <h3>Add new product:</h3>
            <form onSubmit={addnewproduct}>
                <label>name</label>
                <input
                    onChange={handleInput}
                    name="name"
                    value={newProduct.name}
                /><br />
                <label>description</label>
                <input
                    onChange={handleInput}
                    name="description"
                    value={newProduct.description}
                /><br />
                <label>Category</label>
                <select
                    name="category"
                    id="category"
                    onChange={handleInput}
                >
                    <option value='' selected disabled>--Please choose a category--</option>
                    {categories.categories.map(category => {
                        return (
                            <>
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            </>
                        )
                    })}
                </select><br />
                <label>in Stock</label>
                <input
                    onChange={handleInput}
                    name="inStock"
                    type="checkbox"
                    checked={newProduct.inStock}
                /><br />
                <label>featured</label>
                <input
                    onChange={handleInput}
                    name="isFeatured"
                    type="checkbox"
                    checked={newProduct.isFeatured}
                /><br />
                <label>Price</label>
                <input
                    onChange={handleInput}
                    name="price"
                    value={newProduct.price}
                /><br />
                <label>images</label>
                <input
                    onChange={handleInput}
                    name="pictures"
                    value={newProduct.pictures}
                /><br />

                <button>Add new product</button>

            </form>
            </>
        )}
        </div>
        )}
        <AdminCreateCategory />
    </>
    )
};

export default AdminProductList;