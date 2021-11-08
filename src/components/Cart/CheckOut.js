import classes from "./CheckOut.module.css";
import useManagingInput from "../hooks/validate-input";

const pcValid = (value) => {
  const nomValue = Number(value);
  return !isNaN(nomValue) && value.length === 4;
};

const CheckOut = (props) => {
  const {
    value: nameValue,
    isInputValid: isNameValid,
    handleInput: handleName,
  } = useManagingInput("", (value) => value.trim() !== "");
  const {
    value: streetValue,
    isInputValid: isStreetValid,
    handleInput: handleStreet,
  } = useManagingInput("", (value) => value.trim() !== "");
  const {
    value: postalCodeValue,
    isInputValid: isPostalCodeValid,
    handleInput: handlePostalCode,
  } = useManagingInput("", pcValid);
  const {
    value: cityValue,
    isInputValid: isCityValid,
    handleInput: handleCity,
  } = useManagingInput("", (value) => value.trim() !== "");

  const submitHandle = (event) => {
    event.preventDefault();
    const userData = {
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    };
    props.onSubmit(userData);
  };

  const nameHandle = (event) => {
    handleName(event.target.value);
  };

  const streetHandle = (event) => {
    handleStreet(event.target.value);
  };

  const postalCodeHandle = (event) => {
    handlePostalCode(event.target.value);
  };

  const cityHandle = (event) => {
    handleCity(event.target.value);
  };

  const submitability =
    isNameValid && isStreetValid && isPostalCodeValid && isCityValid;
  console.log(isNameValid);
  console.log(submitability);

  return (
    <form className={classes.checkOut} onSubmit={submitHandle}>
      <div className={classes.input}>
        {""}
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={nameValue}
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
          value={streetValue}
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
          value={postalCodeValue}
          onChange={postalCodeHandle}
        ></input>
      </div>
      <div className={classes.input}>
        <label htmlFor="city">city:</label>
        <input
          type="text"
          name="city"
          id="city"
          value={cityValue}
          onChange={cityHandle}
        ></input>
      </div>
      <div className={classes.buttons}>
        <button
          type="submit"
          className={classes.confirm}
          disabled={!submitability}
        >
          confirm
        </button>
        <button type="button" onClick={props.onClose}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
