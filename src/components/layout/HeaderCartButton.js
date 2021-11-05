import React, {useContext} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../store/cart-context";
const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext)
  const cartAmount = cartCtx.items.reduce((acc, cur) => { return acc + cur.amount },0)
  console.log(cartCtx)
    return (
        <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartAmount}</span>
      </button>
    )
}

export default HeaderCartButton