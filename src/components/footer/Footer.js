import React from 'react';
import s from './Footer.module.sass';
import logo from '../../img/logo.png';
import {Link} from "react-router-dom";
import {OFFER_ROUTE, TERMS_ROUTE} from "../../utils/consts";

const Footer = () => {
    return (
        <div className={s.root}>
            <div>
                <img src={logo} alt=""/>
            </div>
            <div>
                <p>ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
            </div>
            <div className={s.root__list}>
                <a href="tel:+79044838228">+7 (904) 483-82-28</a>
                <Link to={TERMS_ROUTE} className={s.root__logo}>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</Link>
                <Link to={OFFER_ROUTE} className={s.root__logo}>ПУБЛИЧНАЯ ОФЕРТА</Link>
            </div>
        </div>
    );
};

export default Footer;