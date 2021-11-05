import React,{useContext} from "react";

import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
const cartCtx= useContext(CartContext)
  const increaseAmountHandler = () => {
  
    cartCtx.increaseItem(props.item.meal.id,props.item.meal.price)
  }
  const decreseAmountHandler=()=> {
  cartCtx.decreaseItem(props.item.meal.id,props.item.meal.price)
  }
  return (
    <li className={classes["cart-item"]}>
      <div className={classes.item}>
        <h3>{props.item.meal.name}</h3>
        <div className={classes["amount-price"]}>
          <span className={classes.price}>${props.item.meal.price}</span>
          <span className={classes.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div>
        <button className={classes.increase} onClick={increaseAmountHandler}>+</button>
        <button className={classes.decrease} onClick={decreseAmountHandler}>-</button>
      </div>
    </li>
  );
};

export default CartItem;
