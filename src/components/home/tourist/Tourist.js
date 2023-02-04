import React from 'react';
import s from "./Tourist.module.sass";

const Tourist = () => {
    return (
        <div className={s.root} id="tourist">
            <div className={s.root__header}>
                <div className={s.root__h2_cont}><h2>ТУРИСТАМ</h2></div>
                <h4>Благодаря богатству и разнообразию природных территорий в этом регионе имеет потенциал не только для
                    внутреннего туризма, но и для гостей из-за рубежа.</h4>
            </div>
            <div className={s.root__tourist_cont}>
                <div className={s.root__tourist_item}>
                    <h5>OUTDOOR-ТУРИСТЫ И
                        ИНОСТРАНЦЫ</h5>
                    <p>Продвижение природных
                        достопримечательностей России
                        за рубежом и среди любителей
                        outdoor туризма
                    </p>
                </div>
                <div className={s.root__tourist_item}>
                    <h5>СЕМЕЙНЫЙ ОТДЫХ</h5>
                    <p>Безопасные и удобные
                        маршруты для активного
                        отдыха с детьми
                    </p>
                </div>
                <div className={s.root__tourist_item}>
                    <h5>ОХОТА, РЫБАЛКА, ПОХОДЫ</h5>
                    <p>Продуманная логистика <br/>
                        - Туристское оборудование<br/>
                        - Жилая инфраструктура
                        вблизи тур. мест.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tourist;