import React from 'react';
import s from "./Banner.module.sass";
import bannerBg from '../../../img/bannerBg.jpg'

const Banner = () => {
    return (
        <div className={s.root}>
            <div>
                <div>
                    <h5>Всероссийская сеть туристических деревень</h5>
                    <h1>GESH VILLAGE</h1>
                </div>
                <div className={s.root__btn_cont}>
                    <div className={s.root__btn_circle}>
                        <a href="#catalog" className={s.root__btn}><p>Забронировать</p></a>
                    </div>
                </div>
            </div>
            <div className={s.root__img}>
                <img src={bannerBg} alt=""/>

            </div>
        </div>
    );
};

export default Banner;