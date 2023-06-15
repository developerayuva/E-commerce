import React, { useContext, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext"
import Item from "./Item";
import CartState from "../context/Cart/CartState";
import HomePageImg from "./ImageComponents/HomePageImg";

function Products() {
    const contextProduct = useContext(ProductContext);
    const {products, getAllProducts} = contextProduct;

    useEffect(() =>{
        getAllProducts();
        // eslint-disable-next-line
    }, []);
    
    return (
        <div>
            <HomePageImg />
            <div className="container">
                <h1 className="display-3 fw-semibold text-center my-3">Welcome to Deliv</h1>
                <p className="text-center fs-2 lead mb-5 mx-auto" id="content-para">Your preferred online shopping platform.<br /> Deliv aims to offer a seamless, fun and reliable shopping experience to millions of users worldwide.</p>
                <div className="row">
                    {products.map((item) => {
                        return (
                            <CartState key={item._id}>
                                <Item item={item} insideCart={false}/>
                            </CartState>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Products;