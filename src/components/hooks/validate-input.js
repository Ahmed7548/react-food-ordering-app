import { useState } from "react";
const useManagingInput = (givenValue, validationCheck) => {
  const [value, setValue] = useState(givenValue);
  const [isInputValid, setInputValid] = useState(false);

  //let isInputValid = false;

  const handleInput = (newValue) => {
    setValue(newValue);
    setInputValid(validationCheck(newValue));
  };
  return {
    value,
    isInputValid,
    handleInput,
  };
};

export default useManagingInput;
