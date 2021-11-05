import React,{useRef} from "react"
import classes from "./input.module.css"

const Input = (props) => {
    const input = useRef()

    const changeHandler = () => {
        props.onChange(input.current.value)
    }
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} onChange={changeHandler} ref={input} />
        </div>
    )
}

export default Input