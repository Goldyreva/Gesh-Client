import React, {useEffect, useState} from 'react'
import s from "./CalendarDropdown.module.sass";
import Calendar from "../Calendar/Calendar";

const CalendarDropdown = ({id, data, add}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [countDay, setCountDay] = useState(0)
    const [rangeDate, setRangeDate] = useState('')
    const [changeDate, setChangeDate] = useState(false)
    const [activeDate, setActiveDate] = useState(false);

    useEffect(() => {
        setStartDate(new Date(data.start_date))
        if(data.end_date !== "1970-01-01T00:00:00.000Z") {
            setEndDate(new Date(data.end_date))
        }
        setChangeDate(true)
    }, [])

    useEffect(() => {
        let sDate = startDate ? startDate.toLocaleDateString('ru-RU') : ''
        let eDate = endDate ? endDate.toLocaleDateString('ru-RU') : ''
        setRangeDate(`ОТ ${sDate} ДО ${eDate}`)
    }, [startDate, endDate])

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setChangeDate(true)

        let count = 0
        let c = Math.ceil((end - start) / 1000 / 60 / 60 / 24)
        if(c >= 0) {count = c}

        let item = {
            id: id,
            startDate: start.toISOString(),
            endDate: end.toISOString(),
            countDay: count
        }

        add(item)
    };



    return(
        <div className={s.root}>
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