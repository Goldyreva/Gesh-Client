import React, {useContext, useRef} from 'react';
import s from "./BottomMenu.module.sass"
import cartImg from "../../img/cart.png";
import reg from "../../img/reg.png";
import {Context} from "../../index";
import {HOME_ROUTE} from "../../utils/consts";
import {NavLink, useParams} from "react-router-dom";


const BottomMenu = () => {
    const {user, cart} = useContext(Context)

    return (
        <div className={s.root}>
            <div>
                {cart
                    ?<><a className={s.root__popUpBtn} onClick={() => cart.setActive(true)}><img src={cartImg} alt=""/> <p>1</p></a> <NavLink to={HOME_ROUTE + "banner"}>Up</NavLink></>
                    :<NavLink to={HOME_ROUTE + "banner"}>О проекте</NavLink>
                }
            </div>
        </div>
    );
};

export default BottomMenu;