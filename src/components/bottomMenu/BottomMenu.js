import React, {useContext, useEffect, useState} from 'react';
import s from "./BottomMenu.module.sass"
import cartImg from "../../img/cart.png";
import up from "../../img/down-arrow.png";
import {Context} from "../../index";
import {HOME_ROUTE} from "../../utils/consts";
import {NavLink, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";


const BottomMenu = observer(() => {
    let {cart} = useContext(Context)

    return (
        <div className={s.root}>
            {cart.getCart.length > 0
                ? <div className={s.root}>
                    <><a className={s.root__popUpBtn} onClick={() => cart.setActive(true)}><img src={cartImg} alt=""/> <p>{cart.getCart.length}</p></a> <NavLink className={s.root__up} to={HOME_ROUTE + "banner"}><img
                        className={s.root__up_img} src={up} alt=""/></NavLink></>
                </div>
                : <NavLink className={s.root__up} to={HOME_ROUTE + "banner"}><img
                className={s.root__up_img} src={up} alt=""/></NavLink>
            }
        </div>
    );
})


export default BottomMenu;