import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Feedbacks.module.sass";
import {getAll, change} from '../../../http/feedbackApi'
import Feedback from "./feedback/Feedback";


const Feedbacks = observer( () => {
    const [feedbackArray, setFeedbackArray] = useState([])

    const changeStatus = async (id, status) => {
        let newStatus = status === 'Новый' ? 'Обработано' : 'Новый'
        await change(id, newStatus)
        getAll().then(data => setFeedbackArray(data.data.sort((x, y) => x.status.localeCompare(y.status))))
    }

    useEffect(() => {
        getAll().then(data => {
            setFeedbackArray(data.data.sort((x, y) => x.status.localeCompare(y.status)))
        })
    }, [])

    // feedbackArray.sort((x, y) => x.status.localeCompare(y.status));
    console.log(feedbackArray);
    return (
        <div className={s.root}>
            <h4>Обратная связь</h4>
            <div className={s.root__table}>
                <div className={s.root__header}>
                    <p><b>ID</b></p>
                    <p><b>Имя</b></p>
                    <p><b>Телефон</b></p>
                    <p><b>Сообщение</b></p>
                    <p><b>Статус</b></p>
                    <p><b>Изменить статус</b></p>
                </div>
                {feedbackArray.map(item =>
                    <Feedback item={item} changeStatus={changeStatus}/>
                )}
            </div>
        </div>
    );
});

export default Feedbacks;