import { useState } from "react";
import CartContext from "./CartContext";
import { useNavigate } from "react-router-dom";

function CartState(props) {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    //Getting all the items from the cart
    const getCartItems = async () => {
        const response = await fetch(`http://localhost:5000/api/cart/getcartitems`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        if(json.success) {
            setCartItems(json.cartProducts);
        } else {
            navigate('/');
        }
    }

    //Adding an item to the cart
    const addToCart = async (id) => {
        const response = await fetch(`http://localhost:5000/api/cart/additem/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        
        const json = await response.json();
        if(json.success) {
            getCartItems();
        }
    }
    
    //Delete an item from the cart
    const deleteFromCart = async (id) => {
        const response = await fetch(`http://localhost:5000/api/cart/deleteitem/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
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