
import classes from "./Card.module.css"

const Card = (props) => {
    const clas= `${classes.card} ${props.className}`
    return (
        
        <div className={clas}>
            {props.children}
        </div>
    )
}

export default Card