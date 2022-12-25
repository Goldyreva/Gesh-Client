import React from 'react';
import s from './Footer.module.sass';
import logo from '../../img/logo.png'

const Footer = () => {
    return (
        <div className={s.root}>
            <div>
                <img src={logo} alt=""/>
            </div>
            <div>
                <p>ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
            </div>
            <div>
                <a href="tel:+79044838228">+7 (904) 483-82-28</a>
            </div>
        </div>
    );
};

export default Footer;