import React, {useState} from 'react';
import s from "./Type.module.sass";
import Confirm from "../../confirm/Confirm";


const Order = ({item, del}) => {

    const [active, setActive] = useState(false)
    let info = {
        id: item.id,
        title: `Удалить тип "${item.name}"?`,
        btn: 'Удалить'
    }

    return (
        <div key={item.id} className={s.root}>
            <Confirm active={active} setActive={() => setActive(!active)} info={info} del={del}/>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p onClick={() => setActive(true)} className={s.root__delete_btn}>Удалить</p>
        </div>
    );
};

export default Order;