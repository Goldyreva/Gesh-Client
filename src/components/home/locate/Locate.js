import React from 'react'
import s from './Locate.module.sass'
import map from '../../../img/map.png'
const Locate = React.forwardRef((props, forwardRef) => {
    return (
        <div className={s.root} id="locate" ref={forwardRef}>
            <div className={s.root__header}>
                <div className={s.root__h2_cont}><h2>МЕСТОНАХОЖДЕНИЕ</h2></div>
            </div>
            <div className={s.root__top_info}>
                <div className={s.root__h1_cont}><h1>GESH VILLAGE</h1></div>
                <h5>Бурно развивающийся горнолыжный курорт всероссийского уровня</h5>
                <p ref={forwardRef}>
                    Сам поселок находиться в  уникальном месте в 310 км от Кемерово и 120 км от Новокузнецка. Регион относится к горной системе Алтая. Этот горно-таёжный край славится своей уникальной и захватывающей дух природой. На территории региона создан Шорский национальный парк и Таштагольский заказник, который создан для охраны пушного зверя, в частности соболя
                </p>
            </div>
            <div className={s.root__bottom_info}>
                <div className={s.root__map_cont}>
                    <img src={map} alt="map"/>
                </div>
                <div className={s.root__info_cont}>
                    <div className={s.root__info_item}>
                        <div className={s.root__span_p_cont}>
                            <span>51,7 </span><p> км^2</p>
                        </div>
                        <p className={s.root__info_p}>Общая площадь курорта</p>
                    </div>
                    <div className={s.root__info_item}>
                        <div className={s.root__span_p_cont}>
                            <p>БОЛЕЕ</p><span>50</span>
                        </div>
                        <p className={s.root__info_p}>Гостиниц, расположенных у подножия гор</p>
                    </div>
                    <div className={s.root__info_item}>
                        <div className={s.root__span_p_cont}>
                            <span>16</span>
                        </div>
                        <p className={s.root__info_p}>горнолыж оборудованных трасс для отдыха</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Locate;