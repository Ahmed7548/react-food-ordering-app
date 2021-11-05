import React, { Fragment,useReducer,useContext } from "react";

import classes from "./EachMeal.module.css";
import MealItemForm from "./MealItemForm";

import CartContext from "../../../store/cart-context";

const mealReduer = (state, action) => {
  if (action.type === "MEAL_AMOUNT") {
    return { amount: action.val, meal:action.meal}
  }
  if (action.type === "ADD_MEAL") {
    return { amount: state.amount, meal:state.meal}
  }
  return {amount:0, meal:state.meal}
}

const MealItem = (props) => {

const mealCtx=useContext(CartContext)

  const [newmeal, dispachMeal] = useReducer(mealReduer, {
    amount: 1,
    meal:props.items
  })


  const ChangeHandler = (change) => {
    dispachMeal({ type: "MEAL_AMOUNT", val:parseInt(change),meal:props.items})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispachMeal({ type: "ADD_MEAL" })
    mealCtx.AddItem(newmeal)
  };
  console.log(newmeal)
  console.log (mealCtx.items)
  
  return (
    <Fragment>
      <li key={props.items.id} className={classes.meal}>
        <ul>
          <li>
            <h3>{props.items.name}</h3>
          </li>
          <li>{props.items.description} </li>
          <li className={classes.price}>${props.items.price}</li>
        </ul>

        <div>
          <MealItemForm id={props.items.id} onChange={ChangeHandler} onSubmit={submitHandler}/>
        </div>
      </li>
    </Fragment>
  );
};

export default MealItem;
