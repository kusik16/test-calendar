import React from "react";
import { getDayOfMonth, getReadableWeekday } from "../../utils/moment-utils";
import moment from "moment";

import Event from "../event/Event";

import "./calendarItem.scss";

const CalendarItem = ({ today, day, events, setEvents }) => {
    const curDayEvents = [];

    if (events.length > 0) {
        events.forEach((event) => {
            if (
                moment(event.date).format("DD") ===
                    moment(day.date).format("DD") &&
                moment(event.date).format("MM") ===
                    moment(day.date).format("MM")
            ) {
                curDayEvents.push(event);
            }
        });
    }

    return (
        <div
            className={`day date-icon ${today}`}
            data-active-month={day.currentMonth}
            data-date={day.date.toString()}>
            <div className='day__info'>
                <div>{getDayOfMonth(day.date)}</div>
                <div>{getReadableWeekday(day.date)}</div>
            </div>
            {curDayEvents.length > 0 ? (
                <div className='day__events'>
                    {curDayEvents.map((event) => {
                        return (
                            <Event
                                key={event.id}
                                setEvents={setEvents}
                                events={events}
                                event={event}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default CalendarItem;
