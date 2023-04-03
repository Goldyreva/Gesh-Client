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

    return (
        <div className={menu.isActive ? `${s.root} ${s.active}` : `${s.root}`}>
            <div className={menu.isActive ? `${s.root__menu_cont} ${s.active}` : `${s.root__menu_cont}`}>
                <div className={s.root__close} onClick={() => menu.setActive(false)}>
                        <svg className={s.root__header_img} fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="black"/>
                        </svg>
                </div>
                <ul>
                    <li>
                        {user.isAuth
                            ? user.user.role === "ADMIN"
                                ? <NavLink to={ADMIN_ROUTE} onClick={() => menu.setActive(false)}>Админ панель</NavLink>
                                : <NavLink to={`${ACCOUNT_ROUTE}/${user.user.id}`} onClick={() => menu.setActive(false)}>Личный кабинет</NavLink>
                            : <a onClick={popUpLink}>Личный кабинет</a>
                        }
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink to={HOME_ROUTE + "about"} onClick={() => menu.setActive(false)}>О проекте</NavLink>*/}
                    {/*</li>*/}
                    <li>
                        <NavLink to={HOME_ROUTE + "catalog"} onClick={() => menu.setActive(false)}>Каталог объектов</NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink to={HOME_ROUTE + "locate"} onClick={() => menu.setActive(false)}>Местоположение</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>

);
});

export default Menu;