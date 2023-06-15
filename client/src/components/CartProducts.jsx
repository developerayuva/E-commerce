import React, { useContext, useEffect } from "react";
import CartContext from "../context/Cart/CartContext"
import Item from "./Item";
import EmptyCartImg from "./ImageComponents/EmptyCartImg";

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
                {cartItems.length!==0 ? cartItems.map((item) => {
                    return <Item key={item._id} item={item} insideCart={true}/>
                }):
                <div className="w-50 mx-auto">
                    <EmptyCartImg />
                </div>
                }
            </div>
        </div>
    )
}

export default CartProducts;