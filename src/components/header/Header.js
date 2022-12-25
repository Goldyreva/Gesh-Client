import s from './Header.module.sass';
import logo from '../../img/logo.png';
import phone from '../../img/phone.png';
import {NavLink} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import reg from '../../img/reg.png';
import cartImg from '../../img/cart.png';
import {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const Header = observer(() => {
    let {modal, cart} = useContext(Context)
    return (
        <div className={s.root}>
            <div className={s.root__padding}></div>
            <div className={s.root__logo_cont}>
                <NavLink to={HOME_ROUTE} className={s.root__logo}>
                    <img src={logo} alt="logo"/>
                </NavLink>
                <div className={s.root__popUpBtn_cont}>
                    <a className={s.root__popUpBtn} onClick={() => cart.setActive(true)}><img src={cartImg} alt=""/> <p>1</p></a>
                    <a className={s.root__popUpBtn} onClick={() => modal.setActive(true)}><img src={reg} alt=""/></a>

                </div>
            </div>
            <div className={s.root__contact}>
                <div>
                    <div className={s.root__contact_cont}><img src={phone} alt="phone"/><a href="tel:+79044838228">+7(904)483-82-28</a></div>
                    <NavLink to={HOME_ROUTE + 'map'} className={s.root__contact_order}>Записаться&nbsp;на&nbsp;просмотр</NavLink>
                </div>
            </div>
        </div>
    );
})

export default Header;
