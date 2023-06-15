import React, { useContext } from "react";
import CartContext from "../context/Cart/CartContext";

function Item(props) {
    const context = useContext(CartContext);
    const {addToCart, deleteFromCart} = context;
    const {_id, title, image, price} = props.item;
    const insideCart = props.insideCart;

    async function handleClick() {
        if(insideCart) {
            deleteFromCart(_id);
        } else {
            addToCart(_id);
        }
    }

    return (
        <div className="col-xl-4 col-md-6">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="d-flex col-4">
                        <img src={image} className="img-fluid rounded-start align-items-center p-md-3 p-4" alt="product_image" id="itemcard-img"/>
                    </div>
                    <div className="col-8 card-body d-flex flex-column justify-content-between">
                        <h5 className="card-title">{title}</h5>
                        <div className="d-flex justify-content-between mt-auto">
                            <button className="btn mx-1" onClick={handleClick}>
                                {!insideCart?
                                 <i className="fa-solid fa-cart-plus fa-xl"></i>:
                                 <i className="fa-solid fa-trash-can fa-xl"></i>
                                }
                            </button>
                            <p className="card-text fs-4 fw-bold"><small className="text-body-secondary">₹ {price}/-</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;