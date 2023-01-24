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
import {getAll} from "./http/typeApi";
import {getAll as getAllItem} from "./http/roomApi"
import {getForUser} from "./http/orderApi";

const App = observer(() => {
    const {user, cart, orderDetails, item} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            getForUser(user.user.id).then(data => {
                orderDetails.setOrders(data)
                data.map(i => {i.status === "Корзина" && cart.addToCart(i)})
            })
        }).finally(() => {setLoading(false)})
        setLoading(true)
        getAll().then(data => item.setTypes(data.data))
        getAllItem().then(data => {
            item.setIsItem(data.data)
        }).finally(() => {setLoading(false)})
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