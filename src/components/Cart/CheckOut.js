import { useState,useReducer } from "react";
import { useEffect } from "react/cjs/react.development";
import Input from "../UI/input/Input";
import classes from "./CheckOut.module.css"
const initialValue = {
    name: { value: "", isValid: false },
    adress: { value: "", isValid: false },
    email: { value: "", isValid: false }
}

const reducerFunction = (state, action) => {
    if (action.type === "EMCHANGE") {
        if (action.value.includes("@")) {
            return {
                name: state.name,
                adress:state.adress,
                email:{ value: action.value, isValid: true }
            }
        } else {
            return {
                name: state.name,
                adress:state.adress,
                email:{ value: action.value, isValid: false }
            }
        }
    }
    if (action.type === "NACHANGE") {
        if (action.value.trim()!=="") {
            return {
                name: {value:action.value, isValid:true},
                adress:state.adress,
                email:state.email
            }
        } else {
            return {
                name: { value: action.value, isValid: false },
                adress:state.adress,
                email:state.email
            }
        }
    }
    if (action.type === "ADCHANGE") {
        if (action.value.trim()!=="") {
            return {
                name:state.name, 
                adress:{value:action.value, isValid:true},
                email:state.email
            }
        } else {
            return {
                name: state.name,
                adress:{ value: action.value, isValid: false },
                email:state.adress
            }
        }
    }

    return initialValue
}
const CheckOut = (props) => {
    // const [Name, setName] = useState("")
    // const [adress, setAdress] = useState("")
    // const [email, setEmail] = useState("")

    const [inputStates,dispatchInputStates]= useReducer(reducerFunction,initialValue)
    
    const emailChangeHandler = (value) => {
        dispatchInputStates({ type: "EMCHANGE", value: value })
        
    }
    const nameChangeHandler = (value) => {
        dispatchInputStates({ type: "NACHANGE", value: value })
        
    }
    const adressChangeHandler = (value) => {
        dispatchInputStates({ type: "ADCHANGE", value: value })
    }
    
    const{name,adress,email}=inputStates
    
    const nameValue=name.value
    const emailValue=email.value
    const adressValue = adress.value
    let disabled = name.isValid && email.isValid && adress.isValid
    useEffect(() => {
        props.onChange(disabled)
    },[disabled,props])
    console.log(inputStates.name.value)
    return (
        <form className={classes.checkOut} onSubmit={props.onSubmit} >
            <Input input={{
                type: "emil",
                id: "Email",
                value: emailValue
            }} label="Enter you email:" onChange={emailChangeHandler}/>
            <Input input={{
                type: "text",
                id: "name",
                value: nameValue
            }} label="Name:" onChange={nameChangeHandler}/>
             <Input input={{
                type: "text",
                id: "adress",
                value:adressValue
            }} label="Adress:" onChange={adressChangeHandler}/>
            {props.children}
        </form>
    )
}

export default CheckOut