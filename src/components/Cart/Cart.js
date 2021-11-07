import React, { useContext } from "react";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import CheckOut from "./CheckOut";
import { useState } from "react/cjs/react.development";



const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
    try {
        console.log(response.json())
    } catch(e) {
        console.log(e)
    }
}

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [displayCheckOut, setDisplayCheckOut] = useState(false);

  const cartItems = (
    <ul style={{ padding: 0 }}>
      {cartCtx.items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </ul>
  );

  const clickHandle = () => {
    setDisplayCheckOut(true);
  };
  const Buttons = (
    <div className={classes.buttons}>
      <button className={classes.order} onClick={clickHandle}>
        order
      </button>
      <button className={classes.close} onClick={props.onClick}>
        close
      </button>
    </div>
  );

    const submitHandle = (uData) => {
        const data = {
            userData: uData ,
            orderData: cartCtx.items
        }
        postData("https://dummy-ordering-app-default-rtdb.firebaseio.com/orderData.json",{data})
    }

  return (
    <div className={classes.cart}>
      {cartItems}
      <div className={classes["total"]}>
        <span>Total amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {displayCheckOut && <CheckOut onClose={props.onClick} onSubmit={submitHandle} />}
      {!displayCheckOut && Buttons}
    </div>
  );
};

export default Cart;
