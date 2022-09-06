import React, { useEffect, useState } from 'react';

import { getToday } from '../../utils/moment-utils';

import CalendarHeader from '../calendarHeader/CalendarHeader';
import CalendarGrid from '../calendarGrid/CalendarGrid';
import Modal from '../modal/Modal';

import './calendar.scss';

const Calendar = ({ onDateSelect }) => {
	const [events, setEvents] = useState(
		localStorage.getItem('events')
			? JSON.parse(localStorage.getItem('events'))
			: []
	);

	const [selectDate, setSelectDate] = useState(getToday());
	const [isModalShow, setIsModalShow] = useState(false);

	const handleModal = () => {
		setIsModalShow(!isModalShow);
	};

	useEffect(() => {
		if (onDateSelect) {
			onDateSelect(selectDate);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className="calendar">
			{isModalShow ? (
				<Modal
					handleModal={handleModal}
					setEvents={setEvents}
					events={events}
				/>
			) : null}
			<CalendarHeader
				handleModal={handleModal}
				selectDate={selectDate}
				setSelectDate={setSelectDate}
			/>
			<CalendarGrid
				selectDate={selectDate}
				setSelectDate={setSelectDate}
				events={events}
				setEvents={setEvents}
			/>
		</div>
	);
};

export default Calendar;
