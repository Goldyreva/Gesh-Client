import React, {useContext, useState} from 'react';
import s from './Account.module.sass'
import Footer from "../../components/footer/Footer";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const Account = observer(() => {
    let {orderDetails, barcode} = useContext(Context)
    const [editActive, setEditActive] = useState(false)
    const orderInfo = [
        {
            id: 1,
            number: '9384HO90',
            status: 'pay'
        }
    ]
    const [inputField, setInputField] = useState({
        //вставить данные из БД
        name: 'Ivan',
        email: '',
        phone: '',
        password: ''
    })
    const [constField, setConstField] = useState({
        name: 'Ivan',
        email: '',
        phone: '',
        password: ''
    })
    const inputsHandler = (e) => {
        setInputField(inputField => ({...inputField, [e.target.name]: e.target.value}))
    }
    const back = () => {
        setInputField(inputField => ({...constField}))
        setEditActive(false)
    }

    const submitButton = () => {
        setEditActive(false)
        setConstField(constField => ({...inputField}))
        console.log(inputField)
        //вставить отправку данных
    }

    return (
        <div className={s.root}>
            <div className={s.root__header}>
                <p>Личный кабинет</p>
                <h2>Приветствуем вас!</h2>
            </div>
            <div className={s.root__main}>
                <div className={s.root__wrapper_person}>
                    <div className={s.root__person}>
                        <div className={s.root__person_header}>
                            <h4>Ваши данные</h4>
                            <div className={s.root__header_icon}>
                                <svg
                                    className={editActive ? `${s.root__header_img} ${s.nonActive}` : `${s.root__header_img}`}
                                    onClick={() => setEditActive(true)} viewBox="0 0 23 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.1663 6.5L17.6504 4.01592C17.8536 3.81282 18.1291 3.69873 18.4163 3.69873C18.7036 3.69873 18.9791 3.81282 19.1823 4.01592L21.9838 6.81742C22.1869 7.02057 22.3009 7.29607 22.3009 7.58333C22.3009 7.87059 22.1869 8.14609 21.9838 8.34925L19.4997 10.8333M15.1663 6.5L4.65042 17.0159C4.44725 17.219 4.33307 17.4945 4.33301 17.7818V20.5833C4.33301 20.8707 4.44714 21.1462 4.65031 21.3494C4.85347 21.5525 5.12902 21.6667 5.41634 21.6667H8.21784C8.50514 21.6666 8.78064 21.5524 8.98376 21.3493L19.4997 10.8333M15.1663 6.5L19.4997 10.8333"
                                        stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <svg onClick={back} className={editActive ? `${s.active}` : `${s.nonActive}`}
                                     viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.744 0L8 5.744L2.256 0L0 2.256L5.744 8L0 13.744L2.256 16L8 10.256L13.744 16L16 13.744L10.256 8L16 2.256L13.744 0Z"
                                        fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div className={s.root__person_content}>
                            <form action="">
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваше ФИО</label>
                                    {editActive
                                        ? <input type="text" value={inputField.name} onChange={inputsHandler}
                                                 name="name"/>
                                        : <p>{inputField.name}</p>
                                    }
                                </div>
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваш email</label>
                                    {editActive
                                        ? <input type="email" value={inputField.email} onChange={inputsHandler}
                                                 name="email"/>
                                        : <p>{inputField.email}</p>
                                    }
                                </div>
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваш телефон: </label>
                                    {editActive
                                        ? <input type="tel" value={inputField.phone} onChange={inputsHandler}
                                                 name="phone"/>
                                        : <p>{inputField.phone}</p>
                                    }
                                </div>
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваш пароль</label>
                                    {editActive
                                        ? <input type="password" value={inputField.password} onChange={inputsHandler}
                                                 name="password"/>
                                        : <input type="password" value={inputField.password} disabled name="password"/>

                                    }
                                </div>
                                <p className={editActive ? `${s.root__btn_submit}` : `${s.root__btn_submit} ${s.nonActive}`}
                                   onClick={submitButton}>Сохранить изменения</p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={s.root__wrapper_order}>
                    <div className={s.root__order}>
                        <div className={s.root__order_header}>
                            <h4>Ваши заказы</h4>
                        </div>
                        <div className={s.root__orders}>
                            <div className={s.root__order_content}>
                                <div className={`${s.root__order_grid} ${s.grid_header}`}>
                                    <div><span>Номер заказа</span></div>
                                    <div><span>Статус</span></div>
                                    <div><span>Подробности</span></div>
                                    <div><span>QR-код</span></div>
                                </div>
                                <div className={s.root__order_grid}>
                                    <div>№0000000</div>
                                    <div>Оплачено</div>
                                    <div><a onClick={() => {
                                        orderDetails.setActive(true)
                                        orderDetails.setId(2)
                                    }}>Перейти</a></div>
                                    <div><a onClick={() => {
                                        barcode.setActive(true)
                                        barcode.setId(2)
                                    }}>Открыть</a></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
});

export default Account;