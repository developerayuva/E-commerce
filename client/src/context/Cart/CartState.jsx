import { useState } from "react";
import CartContext from "./CartContext";

function CartState(props) {
    const [cartItems, setCartItems] = useState([]);

    //Getting all the items from the cart
    const getCartItems = async () => {
        const response = await fetch(`http://localhost:5000/api/cart/getcartitems`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzAwMzUzMTgwMzRiZjMxMTNhYTI2In0sImlhdCI6MTY4NjQyMDA1N30.ayLFBzLQ9LA2Kbw8OCkeOS-6meqL8VztLhWe6ruBKKE"
            }
        });

        const json = await response.json();
        setCartItems(json);
    }

    //Adding an item to the cart
    const addToCart = async (id) => {
        const response = fetch(`http://localhost:5000/api/cart/additem/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzAwMzUzMTgwMzRiZjMxMTNhYTI2In0sImlhdCI6MTY4NjQyMDA1N30.ayLFBzLQ9LA2Kbw8OCkeOS-6meqL8VztLhWe6ruBKKE"
            }
        });
        
        const json = await response.json();
        if(json.success) {
            getCartItems();
        }
    }
    
    //Delete an item from the cart
    const deleteFromCart = async (id) => {
        const response = fetch(`http://localhost:5000/api/cart/deleteitem//${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzAwMzUzMTgwMzRiZjMxMTNhYTI2In0sImlhdCI6MTY4NjQyMDA1N30.ayLFBzLQ9LA2Kbw8OCkeOS-6meqL8VztLhWe6ruBKKE"
            }
        });

        const json = await response.json();
        if(json.success) {
            getCartItems();
        }
    }

    return (
        <CartContext.Provider value={{cartItems, getCartItems, addToCart, deleteFromCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;