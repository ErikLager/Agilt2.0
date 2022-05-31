import productlist from "./mockProduct";
import "./AdminProductlist.css";

const AdminProductList = () => {
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
                            Tags
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
                    {
                        productlist.map((item, index) => {
                            return (
                                <tr key={index} className="item">
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        <input type="text" defaultValue={item.name} />
                                    </td>
                                    <td>
                                        <input type="text" defaultValue={item.description} />
                                    </td>
                                    <td>
                                        <input type="text" defaultValue=
                                            {
                                                item.categories.map((item) => {
                                                    return `${item} \n`
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input type="checkbox" defaultChecked={item.inStock} />
                                    </td>
                                    <td>
                                        <input type="checkbox" defaultChecked={item.isFeatured}/>
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
                    }
                </tbody>
            </table>
        </>
    )
};

export default AdminProductList;