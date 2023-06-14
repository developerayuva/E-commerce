import React, { useContext, useEffect } from "react";
import CartContext from "../context/Cart/CartContext"
import Item from "./Item";

function CartProducts() {
    const contextCart = useContext(CartContext);
    const {cartItems, getCartItems} = contextCart;

    useEffect(() =>{
        getCartItems();
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="container">
            <div className="my-5 row">
                {cartItems.map((item) => {
                    return <Item key={item._id} item={item} insideCart={true}/>
                })}
            </div>
        </div>
    )
}

export default CartProducts;