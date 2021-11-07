import { useReducer } from "react";

import classes from "./CheckOut.module.css";
const initialValue = {
  name: { value: "", isValid: false },
  street: { value: "", isValid: false },
  postalCode: { value: "", isValid: false },
  city: { value: "", isValid: false },
};

const reducerFunction = (state, action) => {
  if (action.type === "STCHANGE") {
    if (action.value.trim() !== "") {
      return {
        name: state.name,
        street: { value: action.value, isValid: true },
        postalCode: state.postalCode,
        city: state.city,
      };
    } else {
      return {
        name: state.name,
        street: { value: action.value, isValid: false },
        postalCode: state.postalCode,
        city: state.city,
      };
    }
  }
  if (action.type === "NACHANGE") {
    if (action.value.trim() !== "") {
      return {
        name: { value: action.value, isValid: true },
        street: state.street,
        postalCode: state.postalCode,
        city: state.city,
      };
    } else {
      return {
        name: { value: action.value, isValid: false },
        street: state.street,
        postalCode: state.postalCode,
        city: state.city,
      };
    }
  }
  if (action.type === "CTCHANGE") {
    if (action.value.trim() !== "") {
      return {
        name: state.name,
        street: state.street,
        postalCode: state.postalCode,
        city: { value: action.value, isValid: true },
      };
    } else {
      return {
        name: state.name,
        street: state.street,
        postalCode: state.postalCode,
        city: { value: action.value, isValid: false },
      };
    }
  }
  if (action.type === "PCCHANGE") {
    const value = Number(action.value);
    if (!isNaN(value) && action.value.length === 4) {
      return {
        name: state.name,
        street: state.street,
        postalCode: { value: action.value, isValid: true },
        city: state.city,
      };
    } else {
      return {
        name: state.name,
        street: state.street,
        postalCode: { value: action.value, isValid: false },
        city: state.city,
      };
    }
  }

  return initialValue;
};


const CheckOut = (props) => {
    const [inputStates, dispatchInputStates] = useReducer(
        reducerFunction,
        initialValue
        );
        const { name, street, postalCode, city } = inputStates;
        const submitHandle = (event) => {
            event.preventDefault();
            const userData = {
                name: name.value,
                street: street.value,
                postalCode: postalCode.value,
                city:city.value
            }
            props.onSubmit(userData)
            
        };

  const nameHandle = (event) => {
    dispatchInputStates({ type: "NACHANGE", value: event.target.value });
  };

  const streetHandle = (event) => {
    dispatchInputStates({ type: "STCHANGE", value: event.target.value });
  };

  const postalCodeHandle = (event) => {
    dispatchInputStates({ type: "PCCHANGE", value: event.target.value });
  };

  const cityHandle = (event) => {
    dispatchInputStates({ type: "CTCHANGE", value: event.target.value });
  };
    
    const submitability = name.isValid && street.isValid && postalCode.isValid && city.isValid
    
    console.log(submitability)

  return (
    <form className={classes.checkOut} onSubmit={submitHandle}>
      <div className={classes.input}>
        {""}
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name.value}
          onChange={nameHandle}
        ></input>
      </div>
      <div className={classes.input}>
        {" "}
        <label htmlFor="street">street:</label>
        <input
          type="text"
          name="street"
          id="street"
          value={street.value}
          onChange={streetHandle}
        ></input>
      </div>
      <div className={classes.input}>
        {" "}
        <label htmlFor="postal-code">postal-code:</label>
        <input
          type="text"
          name="postal-code"
          id="postal-code"
          value={postalCode.value}
          onChange={postalCodeHandle}
        ></input>
      </div>
      <div className={classes.input}>
        <label htmlFor="city">city:</label>
        <input
          type="text"
          name="city"
          id="city"
          value={city.value}
          onChange={cityHandle}
        ></input>
      </div>
      <div className={classes.buttons}>
        <button type="submit" className={classes.confirm} disabled={!submitability}>confirm</button>
        <button type="button" onClick={props.onClose}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
