import React, {useContext} from "react";

import classes from "./Cart.module.css"
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import CheckOut from "./CheckOut";
import { useState } from "react/cjs/react.development";



const Cart = props => {
    const cartCtx = useContext(CartContext)
    const cartItems = <ul style={{ padding: 0 }}>{cartCtx.items.map(item => <CartItem item={item} key={item.id}/>)}</ul>
    const [disabled,setDisabled]=useState(false)
    const submitHandle = (event) => {
        event.preventDefault()
    }
   
    const changeHandle = (disabled) => {
        setDisabled(disabled)
    }
  

    return (
        <div className={classes.cart}>
            {cartItems}
            <div className={classes["total"]}>
                <span>Total amount</span>
                <span>${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            <CheckOut onSubmit={submitHandle} onChange={changeHandle}>
            <div className={classes.buttons}>
                <button className={classes.order} type="submit" disabled={!disabled}>
                    order
                </button>
                <button className={classes.close} onClick={props.onClick} >
                    close
                </button>
            </div>
            </CheckOut>
        </div>
    )
}

export default Cart