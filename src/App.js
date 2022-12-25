import React, {useContext, useState} from 'react';
import './App.css';
import Header from "./components/header/Header";
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import Menu from "./components/menu/Menu";
import Hamburger from "./components/hamburger/Hamburger";
import Modal from "./components/modal/Modal";
import Cart from "./components/cart/Cart";
import OrderDetails from "./components/orderDetails/orderDetails";
import Barcode from "./components/barcode/Barcode";

function App() {
    // let menuActive
    // function setMenuActive(menuActive){
    //     console.log("menuActive")
    //     return !menuActive
    // }

      return (
        <BrowserRouter>
            <Menu/>
                <Hamburger/>
            <Header/>

            <AppRouter/>
            <Modal/>
            <Cart/>
            <OrderDetails/>
            <Barcode/>

        </BrowserRouter>
  );
}

export default App;
