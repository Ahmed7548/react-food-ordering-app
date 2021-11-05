import React, {useContext} from "react";

import classes from "./Cart.module.css"
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";


const Cart = props => {
    const cartCtx = useContext(CartContext)
    const cartItems = <ul style={{ padding: 0 }}>{cartCtx.items.map(item => <CartItem item={item} key={item.id}/>)}</ul>
    
    return (
        <div className={classes.cart}>
            {cartItems}
            <div className={classes["total"]}>
                <span>Total amount</span>
                <span>${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.buttons}>
                <button className={classes.order}>
                    order
                </button>
                <button className={classes.close} onClick={props.onClick}>
                    close
                </button>
            </div>
           
        </div>
    )
}

export default Cart