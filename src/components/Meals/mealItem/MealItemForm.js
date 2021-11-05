import React from "react";
import Input from "../../UI/input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  
  
  

  

  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      {/*    <input type="number" min="1" defaultValue="1" /> */}
      <Input
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "6",
          step: "1",
          defaultValue: "1",
        }}
        onChange={props.onChange}
      />
      <button type="submit">Add+</button>
    </form>
  );
};

export default MealItemForm;
