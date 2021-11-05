import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultValue = {
  items: [],
  totalAmount: 0,
};

const reduceCart = (state, action) => {
  if (action.type === "ADD") {
    if (state.items.length) {
      let checker;
      const meals = state.items.map((element) => {
        if (element.meal === action.item.meal) {
          checker = true;
          return {
            amount: element.amount + action.item.amount,
            meal: action.item.meal,
          };
        } else {
          checker = false;
          return {
            amount: element.amount,
            meal: element.meal,
          };
        }
      });
      if (checker) {
        return {
          items: meals,
          totalAmount:
            state.totalAmount + action.item.meal.price * action.item.amount,
        };
      } else {
        return {
          items: meals.concat(action.item),
          totalAmount:
            state.totalAmount + action.item.meal.price * action.item.amount,
        };
      }
    } else {
      return {
        items: [action.item],
        totalAmount: action.item.meal.price * action.item.amount,
      };
    }
  }
  if (action.type === "INC_AMOUNT") {
    const meals = state.items.map((element) => {
      if (action.id === element.meal.id) {
        return {
          amount: ++element.amount,
          meal: element.meal,
        };
      } else {
        return element;
      }
    });
    return {
      items: meals,
      totalAmount: state.totalAmount + action.price,
    };
  }
  if (action.type === "DEC_AMOUNT") {
    const meals = state.items
      .map((element) => {
        if (action.id === element.meal.id) {
          return {
            amount: --element.amount,
            meal: element.meal,
          };
        } else {
          return element;
        }
      })
      .filter((element) => element.amount !== 0);
    return {
      items: meals,
      totalAmount: state.totalAmount - action.price,
    };
  }

  return defaultValue;
};

const CartProvider = (props) => {
  const [cartState, dispachCartState] = useReducer(reduceCart, defaultValue);

  const addItemToCardHandler = (item) => {
    dispachCartState({ type: "ADD", item: item });
  };

  const increaseItemHandler = (id, price) => {
    dispachCartState({ type: "INC_AMOUNT", id: id, price: price });
  };
  const decreaseItemHandler = (id, price) => {
    dispachCartState({ type: "DEC_AMOUNT", id: id, price: price });
  };

  const cartContext = {
    ...cartState,
    AddItem: addItemToCardHandler,
    increaseItem: increaseItemHandler,
    decreaseItem: decreaseItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
