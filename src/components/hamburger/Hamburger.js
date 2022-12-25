import React, {useContext} from 'react';
import s from './Hamburger.module.sass'
import img from '../../img/burger.png'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Hamburger = observer(() => {
    let {menu} = useContext(Context)

    return (
        <div className={s.root} onClick={() => menu.setActive(true)}>
            <img src={img} alt="" className={s.root__img}/>
        </div>
    );
});

export default Hamburger;