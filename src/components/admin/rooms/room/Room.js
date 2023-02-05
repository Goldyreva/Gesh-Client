import React, {useState} from 'react';
import s from "./Room.module.sass";
import Confirm from "../../confirm/Confirm";
import Carousel from "../../../carousel/Carousel";


const Room = ({item, del}) => {

    const [active, setActive] = useState(false)
    let info = {
        id: item.id,
        title: `Удалить номер "${item.name}"?`,
        btn: 'Удалить'
    }

    return (
        <div className={s.root}>
            <Confirm active={active} setActive={() => setActive(!active)} info={info} del={del}/>
            <p>{item.id}</p>
            <Carousel images={item.itemsImages}/>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.price} руб/сутки</p>
            <p>{item.count_people}</p>
            <p onClick={() => setActive(true)} className={s.root__delete_btn}>Удалить</p>
        </div>
    );
};

export default Room;