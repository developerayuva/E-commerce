import { useState } from "react";
import ProductContext from "./ProductContext";

//Getting all the products present on the store
function ProductState(props) {
    const [products, setProducts] = useState([]);

    //ToDo: updating env file
    const getAllProducts = async () => {
        const response = await fetch(`http://localhost:5000/api/product/getallproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        setProducts(json);
    }

    return (
        <ProductContext.Provider value={{products, getAllProducts}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;