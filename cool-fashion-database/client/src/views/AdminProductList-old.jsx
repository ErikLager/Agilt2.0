import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import productlist from "./mockProduct";
import "./AdminProductlist.css";
import { checkAuthentication } from '../hooks/auth'

const AdminProductList = () => {
    const [authenticated, setAuthenticated] = useState(null)
    const [waitingForAuth, setWaitingForAuth] = useState(true)
    
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
    
    useEffect(() => {
        checkAuthentication()
    }, [])
    
    useEffect(() => {
        if (authenticated) {
            setWaitingForAuth(false)    
        }
    }, authenticated)
    
    
    return (
        <>  
            {waitingForAuth && <p>Loading...</p>}
            {!waitingForAuth && (
                <div>
                {!authenticated && <Navigate to='/' />}
                {authenticated && (
                    <>
                    <p>You are logged in!</p>
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
                )}
                </div>
            )}
        </>
    )
};

export default AdminProductList;