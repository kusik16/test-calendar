import React, { useEffect, useState, useMemo } from 'react';

import Box from '@mui/material/Box';

import CalendarHeader from '../calendarHeader/CalendarHeader';
import CalendarGrid from '../calendarGrid/CalendarGrid';
import Modal from '../modal/Modal';
import CalendarContent from 'components/calendarContent/CalendarContent';

import { getToday } from '../../utils/moment-utils';

const Calendar = ({ onDateSelect }) => {
	const [selectDate, setSelectDate] = useState(getToday());
	const [isModalShow, setIsModalShow] = useState(false);

	const handleModal = () => {
		setIsModalShow(!isModalShow);
	};

	useEffect(() => {
		if (onDateSelect) {
			onDateSelect(selectDate);
		}
	}, [selectDate, onDateSelect]);

	const renderContent = useMemo(() => {
		return (
			<>
				<CalendarHeader
					selectDate={selectDate}
					setSelectDate={setSelectDate}
					handleModal={handleModal}
				/>
				<CalendarGrid
					selectDate={selectDate}
					setSelectDate={setSelectDate}
				/>
			</>
		);
		//eslint-disable-next-line
	}, [selectDate, setSelectDate]);

	return (
		<Box
			component="main"
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{isModalShow ? <Modal handleModal={handleModal} /> : null}
			<CalendarContent renderContent={renderContent} />
		</Box>
	);
};

export default Calendar;
