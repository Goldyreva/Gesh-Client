import React from 'react';
import s from "./Feedback.module.sass";


const Feedback = ({item, changeStatus}) => {
    return (
        <div key={item.id} className={s.root}>
            {/*<Confirm active={active} setActive={() => setActive(!active)} info={info} del={changeStatus}/>*/}
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.phone}</p>
            <p>{item.message}</p>
            <p>{item.status}</p>
            <p onClick={() => changeStatus(item.id, item.status)} className={s.root__delete_btn}>Изменить статус</p>
        </div>
    );
};

export default Feedback;