import React from "react";
import {
    getMonthDayYear,
    getMonth,
    getYear,
    getToday,
} from "../../utils/moment-utils";
import { getDatesInMonthDisplay } from "../../utils/date-utils";

import CalendarItem from "../calendarItem/CalendarItem";

import "./calendarGrid.scss";

const CalendarGrid = ({ selectDate, events, setEvents }) => {
    const datesInMonth = getDatesInMonthDisplay(
        getMonth(selectDate) + 1,
        getYear(selectDate),
    );

    const monthDates = datesInMonth.map((day, key) => {
        const today =
            getMonthDayYear(getToday()) === getMonthDayYear(day.date)
                ? "today"
                : "";

        return (
            <CalendarItem
                key={key}
                today={today}
                day={day}
                events={events}
                setEvents={setEvents}
            />
        );
    });

    return <div className='calendar__grid'>{monthDates}</div>;
};

export default CalendarGrid;
