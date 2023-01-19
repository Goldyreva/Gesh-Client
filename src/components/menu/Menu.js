import React, {useContext} from 'react';
import s from './Menu.module.sass';
import {NavLink} from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, HOME_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const Menu = observer(() => {
    const {user, modal, menu} = useContext(Context)
    function popUpLink(){
        menu.setActive(false)
        modal.setActive(true)
    }

    console.log(user.user.role)
    return (
        <div className={menu.isActive ? `${s.root} ${s.active}` : `${s.root}`}>
            <div className={menu.isActive ? `${s.root__menu_cont} ${s.active}` : `${s.root__menu_cont}`}>
                <div className={s.root__close} onClick={() => menu.setActive(false)}>close</div>
                <ul>
                    <li>
                        {user.isAuth
                            ? user.user.role === "ADMIN"
                                ? <NavLink to={ADMIN_ROUTE} onClick={() => menu.setActive(false)}>Админ панель</NavLink>
                                : <NavLink to={`${ACCOUNT_ROUTE}/${user.user.id}`} onClick={() => menu.setActive(false)}>Личный кабинет</NavLink>
                            : <a onClick={popUpLink}>Личный кабинет</a>
                        }
                    </li>
                    <li>
                        <NavLink to={HOME_ROUTE + "about"} onClick={() => menu.setActive(false)}>О проекте</NavLink>
                    </li>
                    <li>
                        <NavLink to={HOME_ROUTE + "catalog"} onClick={() => menu.setActive(false)}>Каталог объектов</NavLink>
                    </li>
                    <li>
                        <NavLink to={HOME_ROUTE + "locate"} onClick={() => menu.setActive(false)}>Местоположение</NavLink>
                    </li>
                </ul>
            </div>
        </div>

);
});

export default Menu;