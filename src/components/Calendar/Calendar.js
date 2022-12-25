import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import './Calendar.css'

const Calendar = ({startDate, endDate, onChange}) => {
    return(
        <DatePicker
            selected={startDate}
            onChange={(dates) => onChange(dates)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline locale={ru}
        />
    );
};

export default Calendar;