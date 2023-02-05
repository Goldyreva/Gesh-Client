import React from 'react';
import s from './Footer.module.sass';
import logo from '../../img/logo.png';
import {Link} from "react-router-dom";
import {OFFER_ROUTE, TERMS_ROUTE} from "../../utils/consts";

const Footer = () => {
    return (
        <div className={s.root}>
            <div className={s.root__list}>
                <img src={logo} alt=""/>
                <Link to={TERMS_ROUTE} className={s.root__logo}>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</Link>
                <Link to={OFFER_ROUTE} className={s.root__logo}>ПУБЛИЧНАЯ ОФЕРТА</Link>
            </div>
            <div>
                <p>ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
            </div>
            <div className={s.root__info}>
                <a href="tel:+79044838228">+7 (904) 483-82-28</a>
                <p>Юридический адрес 652992, Кемеровская область, р-н Таштагольский, г. Таштагол, ул. Поспелова, д.18, оф. 10</p>
                <p>Фактический адрес 652992, Кемеровская область, р-н Таштагольский, г. Таштагол, ул. Поспелова, д.18, оф. 10ИНН 4205393737</p>
                <p>КПП 420501001</p>
                <p>ОКПО 46620676</p>
                <p>ОГРН 1204200017493</p>
            </div>
        </div>
    );
};

export default Footer;