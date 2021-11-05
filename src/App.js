import React, { useState } from "react";

import Meals from "./components/Meals/Meals";

import Header from "./components/layout/Header";

import Modal from "./components/UI/modal/modal";
import CartProvider from "./store/CartProvider";

function App() {
  const [viewCart,setViewCart]=useState(false)
    const showCart = () => {
        setViewCart(true)
    }
    const removeModal = () => {
        setViewCart(false)
    }
  return (
    
    <CartProvider>
      <Header onClick={showCart}/>
      <main>
      <Meals />
      </main>
      {viewCart && <Modal onClick={removeModal}/>}
    </CartProvider>
    
  );
}

export default App;
