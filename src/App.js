import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Header from "./components/header/Header";
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Menu from "./components/menu/Menu";
import Hamburger from "./components/hamburger/Hamburger";
import Modal from "./components/modal/Modal";
import Cart from "./components/cart/Cart";
import OrderDetails from "./components/orderDetails/orderDetails";
import Barcode from "./components/barcode/Barcode";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        check().then(data => {
            console.log(data)
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])
    if (loading){
        return <h2>Загрузка...</h2>
    }
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
})

export default App;