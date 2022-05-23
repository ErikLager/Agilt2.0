import productlist from "./mockProduct";    

const AdminProductList = () => {
    return(
        <>
            <h1>List of all the products</h1>
            {
                productlist.map((item, index) => {
                    console.log(item);

                    return(
                        <div className="productelement">
                            <p>{item.name}</p>
                            {/* <img src={item.pictures[0]}></img> */}
                            <ul>
                                {item.categories.map((item, index)=>{
                                    return(
                                        <li key={index}>{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
            }
        </>
    )
};

export default AdminProductList;