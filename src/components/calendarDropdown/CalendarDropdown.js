import React, {useState} from 'react'
import s from "../cart/Cart.module.sass";
import Calendar from "../Calendar/Calendar";

const CalendarDropdown = (props) => {
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
        <div className={s.root__select_container}>
            <div className={s.root__select_div} onClick={() => setActiveDate(!activeDate)}>
                <p className={`${changeDate ? s.root__par : ''}`}>{changeDate && (rangeDate !== '') ? rangeDate :'ВЫБЕРИТЕ ПЕРИОД'}</p>
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 6L7 8L9 8L9 6L7 6Z"/>
                </svg>
            </div>
            <div className={activeDate ? `${s.root__select_content} ${s.active_date}` : `${s.root__select_content}`}>
                <Calendar startDate={startDate} endDate={endDate} onChange={onChange}/>
            </div>
        </div>
    )
}

export default CalendarDropdown