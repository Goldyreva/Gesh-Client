import React from 'react';
import s from "./Map.module.sass";
import map from '../../../img/villageMap.jpg'

const Map = React.forwardRef((props, forwardRef) => {
    return (
        <div className={s.root} id="map" ref={forwardRef}>
            <div className={s.root__header}>
                <div className={s.root__h2_cont}><h2>КАРТА ПОСЕЛКА</h2></div>
            </div>
            <div className={s.root__map_cont}>
                <div className={s.root__feedback}>
                    <div className={s.root__h3_cont}>
                        <h3>По вопросам
                        бронирования и
                        покупки домов</h3>
                    </div>

                    <h4>воспользуйтесь формой обратной связи:</h4>
                    <form action="">
                        <input type="text" className="text" placeholder="ВАШЕ ИМЯ"/>
                        <input type="tel" className="tel" placeholder="+7(999)-999-99-99"/>
                        <textarea name="" id="" cols="30" rows="10" placeholder="ВАШЕ СООБЩЕНИЕ"></textarea>
                        <button className={s.root__submit_btn}>ОТПРАВИТЬ</button>
                    </form>
                </div>
                <div  className={s.root__map}>
                    <img src={map} alt="map"/>
                </div>
            </div>
        </div>
    );
});

export default Map;