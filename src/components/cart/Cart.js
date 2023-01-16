import React, {useContext, useState} from 'react';
import s from "./Cart.module.sass";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {login, registration} from "../../http/userApi";
import Calendar from "../Calendar/Calendar";
import CalendarDropdown from "../calendarDropdown/CalendarDropdown";

const Cart = observer(() => {
    let {cart, item} = useContext(Context)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [rangeDate, setRangeDate] = useState('')
    const [changeDate, setChangeDate] = useState(false)
    const [activeDate, setActiveDate] = useState(false);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setChangeDate(true)
    };

    return(

        <div className={cart.isActive ? `${s.root} ${s.active}` : `${s.root}`} onClick={() => cart.setActive(false)}>
            <div className={s.root__modal_content} onClick={e =>e.stopPropagation()}>
                <div className={s.root__header}>
                    <h2>Ваш заказ</h2>
                    <div className={s.root__header_close} onClick={() => cart.setActive(false)}>
                        <svg className={s.root__header_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={s.root__summary}>
                    {cart.getCart.map(i =>
                    <div className={s.root__summary_top} key={i.id}>
                        <p>{item.items.filter(item => item.id === i.itemId)[0].name}</p>
                        {/*<p>{console.log(i)}</p>*/}
                        {/*<div className={s.root__select_container}>*/}
                        {/*    <div className={s.root__select_div} onClick={() => setActiveDate(!activeDate)}>*/}
                        {/*        <p className={`${changeDate ? s.root__par : ''}`}>{changeDate && (rangeDate !== '') ? rangeDate :'ВЫБЕРИТЕ ПЕРИОД'}</p>*/}
                        {/*        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*            <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 6L7 8L9 8L9 6L7 6Z"/>*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*    <div className={activeDate ? `${s.root__select_content} ${s.active_date}` : `${s.root__select_content}`}>*/}
                        {/*        <Calendar startDate={startDate} endDate={endDate} onChange={onChange}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <CalendarDropdown item = {{startDate: i.start_date, endDate: i.end_date}}/>
                    </div>
                    )}
                    <h4>ИТОГО: 12 000 руб.</h4>

                </div>
                <div className={s.root_reg}>
                        <p className={s.root__btn_submit}>Оплатить</p>
                </div>
            </div>
        </div>
    );
});

export default Cart;