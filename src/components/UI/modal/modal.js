import React, { Fragment } from "react";
import ReactDom from "react-dom";

import Cart from "../../Cart/Cart";

import classes from "./modal.module.css"


const Overlay = props => {
    return (<div className={classes.overlay}>
      <Cart onClick={props.onClick}/>
    </div>)
}

const Backdrop = props => {
    return(
    <div className={classes.backdrop} onClick={props.onClick}></div>
    )
}

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Overlay onClick={props.onClick} />, document.getElementById('overlay-root'))}
        {ReactDom.createPortal(<Backdrop onClick={props.onClick} />,document.getElementById('backdrop-root'))}
    </Fragment>
  );
};

export default Modal;
