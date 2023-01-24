import React, {useContext, useEffect, useMemo, useState} from 'react';
import s from './Catalog.module.sass'
import {Context} from "../../../index";
import Calendar from "../../Calendar/Calendar";
import {create} from "../../../http/orderApi";
import Carousel from "../../carousel/Carousel";
import AddedConfirm from "../../addedConfirm/AddedConfirm";


const Catalog = React.forwardRef((props, forwardRef) => {
    const {item, cart, user, orderDetails} = useContext(Context)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [countDay, setCountDay] = useState(0)
    const [rangeDate, setRangeDate] = useState('')
    const [changeDate, setChangeDate] = useState(false)

    const [peopleCount, setPeopleCount] = useState(0)
    const [kidCount, setKidCount] = useState(0)
    const [changePeople, setChangePeople] = useState(false)

    const [activeType, setActiveType] = useState('')

    const [confirmActive, setConfirmActive] = useState(false)
    const [confirmRoom, setConfirmRoom] = useState("")

    const [active, setActive] = useState(false);
    const [activePeople, setActivePeople] = useState(false);
    const [activeDate, setActiveDate] = useState(false);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setChangeDate(true)
    };

    const delById = (arr, id) => {
        const i = arr.findIndex(el => el.id === id);
        if (-1 === i) return arr;
        arr.splice(i, 1);
        return arr;
    }

    const myList = useMemo(() => {
        let list = item.items.filter(room => room.count_people >= peopleCount + kidCount)
        if (activeType !== '') {
            list = list.filter(room => item.types.filter(i => i.id === room.typeId)[0].name.toUpperCase() === activeType)
        }

        let orders = orderDetails.orders.filter(order => order.status === 'Новый' || order.status === 'Обработан')
        let test = []

        for(let j = 0; j < orders.length; j++) {
            let sd = new Date(orders[j].start_date)
            let ed = new Date(orders[j].end_date)
            if((endDate >= sd && startDate <= ed)) {
                test.push(orders[j].itemId)
            }
        }

        if(test.length === 0) {return list}

        let myList = list
        for(let i = 0; i < test.length; i++) {
            myList = delById(myList, test[i])
        }
        return myList
    }, [startDate, endDate, kidCount, peopleCount, activeType])

    useEffect(() => {
        let sDate = startDate ? startDate.toLocaleDateString('ru-RU') : ''
        let eDate = endDate ? endDate.toLocaleDateString('ru-RU') : ''
        setRangeDate(`ОТ ${sDate} ДО ${eDate}`)

        let count = Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24)
        if (count >= 0) {
            setCountDay(count)
        }
    }, [startDate, endDate])

    const addItemToCart = (item) => {
        create(startDate.toISOString(), endDate === null ? new Date(0) : endDate.toISOString(), countDay, user.user.id, item)
            .then(data => {
                cart.addToCart(data)
                setConfirmActive(true)
            })
        }

    return (
    <div className={s.root} id="catalog" ref={forwardRef}>
        <AddedConfirm text={`Объект "${confirmRoom}" добавлен в корзину`} active={confirmActive} setActive={setConfirmActive}/>
        <div className={s.root__header}>
                <div className={s.root__h2_cont}><h2>КАТАЛОГ ОБЬЕКТОВ</h2></div>
                <h4>АРЕНДА ДОМОВ</h4>
            </div>
            <div>
                <form action="" className={s.root__form}>
                    <div className={s.root__select_container}>
                        <div className={s.root__select_div} onClick={() => setActiveDate(!activeDate)}>
                            <p className={`${changeDate ? s.root__par : ''}`}>{changeDate && (rangeDate !== '') ? rangeDate : 'ВЫБЕРИТЕ ПЕРИОД'}</p>
                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 6L7 8L9 8L9 6L7 6Z"/>
                            </svg>
                        </div>
                        <div
                            className={activeDate ? `${s.root__select_content} ${s.active_date}` : `${s.root__select_content}`}>
                            <Calendar startDate={startDate} endDate={endDate} onChange={onChange}/>
                        </div>
                    </div>
                    <div className={s.root__select_container}>
                        <div className={s.root__select_div} onClick={() => setActivePeople(!activePeople)}>
                            <p className={`${changePeople ? s.root__par : ''}`}>{`${peopleCount} ВЗРОСЛЫХ , ${kidCount} ДЕТЕЙ`}</p>
                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 6L7 8L9 8L9 6L7 6Z"/>
                            </svg>
                        </div>
                        <div
                            className={activePeople ? `${s.root__select_content} ${s.active_people}` : `${s.root__select_content}`}>
                            <div className={s.root__countPeople_cont}>
                                <div className={s.root__countPeople}>
                                    <label htmlFor="">{`Взрослых: ${peopleCount}`}</label>
                                    <input type="range" step="1" min="1" max="10" value={peopleCount} onChange={(e) => {
                                        setPeopleCount(Number(e.target.value))
                                        setChangePeople(true)
                                    }}/>
                                </div>
                                <div className={s.root__countPeople}>
                                    <label htmlFor="">{`Детей (до 12 лет): ${kidCount}`}</label>
                                    <input type="range" step="1" min="0" max="10" value={kidCount} onChange={(e) => {
                                        setKidCount(Number(e.target.value))
                                        setChangePeople(true)
                                    }}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={s.root__select_container}>
                        <div className={s.root__select_div} onClick={() => setActive(!active)}>
                            <p className={`${activeType ? s.root__par : ''}`}>{activeType ? activeType : 'ВЫБЕРИТЕ ТИП НОМЕРА'}</p>
                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 6L7 8L9 8L9 6L7 6Z"/>
                            </svg>
                        </div>
                        <div
                            className={active ? `${s.root__select_content} ${s.active_room}` : `${s.root__select_content}`}>
                            <div className={s.root__room_type_cont}>
                                <ul>
                                    <li key='base' onClick={() => setActiveType('')}>Без типа</li>
                                    {item.types.map(item =>
                                        <li key={item.id}
                                            onClick={() => setActiveType(item.name.toUpperCase())}>{item.name}</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>
                    <a className={s.root__submit} onClick={() => {
                        setPeopleCount(0)
                        setKidCount(0)
                        setActiveType('')
                    }}>Сброс</a>
                </form>
            </div>
            <div className={s.root__cart_cont}>
                {myList.length === 0
                    ? <p className={s.root__cart_null}>Номера не найдены:(</p>
                    : myList.map(item =>
                        <div className={s.root__cart} key={item.id}>
                            <div>
                                <Carousel images={item.itemsImages}/>
                                {/*{item.itemsImages.map(img =>*/}
                                {/*    <img src={`${process.env.REACT_APP_API_URL}${img.link}`} key={img.id} alt=""/>*/}
                                {/*)}*/}
                            </div>

                            <div className={s.root__cart_header}>
                                <h5>{item.name}</h5>
                                <h5>{`ОТ ${item.price} РУБ/СУТКИ`}</h5>
                            </div>
                            <div className={s.root__cart_content}>
                                <p>{item.description}</p>
                                <svg onClick={() => {addItemToCart(item.id)
                                    setConfirmRoom(item.name)
                                }} width="33" height="33" viewBox="0 0 33 33"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M31 32.5C31.8284 32.5 32.5 31.8284 32.5 31L32.5 17.5C32.5 16.6716 31.8284 16 31 16C30.1716 16 29.5 16.6716 29.5 17.5L29.5 29.5L17.5 29.5C16.6716 29.5 16 30.1716 16 31C16 31.8284 16.6716 32.5 17.5 32.5L31 32.5ZM0.93934 3.06066L29.9393 32.0607L32.0607 29.9393L3.06066 0.93934L0.93934 3.06066Z"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_23_96" x1="16.5" y1="16.5" x2="7.65724e-06"
                                                        y2="9.99998" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF8A36"/>
                                            <stop offset="1" stopColor="#FF8A36" stopOpacity="0"/>
                                        </linearGradient>
                                        <linearGradient id="paint1" x1="16.5" y1="16.5" x2="7.65724e-06" y2="9.99998"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#ff9d5c"/>
                                            <stop offset="1" stopColor="#ff9d5c" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    );
});

export default Catalog;