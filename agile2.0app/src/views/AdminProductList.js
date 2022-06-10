import "./AdminProductlist.css";
import { useEffect, useState } from "react";


const AdminProductList = () => {

    const [newProduct, setNewProduct] = useState({});

    const [products, setProducts] = useState({});

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
                                <tr key={index} className="item">
                                    <td>
                                        {item._id}
                                    </td>
                                    <td>
                                        <input type="text" defaultValue={item.name} />
                                    </td>
                                    <td>
                                        <input type="text" defaultValue={item.description} />
                                    </td>
                                    <td>
                                        <input type="text" defaultValue={item.categories} />
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
                                        <button>Update</button>
                                    </td>
                                </tr>
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
    )
};

export default AdminProductList;