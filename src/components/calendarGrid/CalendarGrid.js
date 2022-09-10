import React from 'react';

import Box from '@mui/material/Box';

import {
	getMonthDayYear,
	getMonth,
	getYear,
	getToday,
} from '../../utils/moment-utils';
import { getDatesInMonthDisplay } from '../../utils/date-utils';

import CalendarItem from '../calendarItem/CalendarItem';

const CalendarGrid = ({ selectDate }) => {
	const datesInMonth = getDatesInMonthDisplay(
		getMonth(selectDate) + 1,
		getYear(selectDate)
	);

	const monthDates = datesInMonth.map((day, key) => {
		const today =
			getMonthDayYear(getToday()) === getMonthDayYear(day.date)
				? 'today'
				: '';

		return <CalendarItem key={key} today={today} day={day} />;
	});

	return (
		<Box
			sx={{
				display: 'grid',
				maxWidth: '1440px',
				gridTemplateColumns: 'repeat(7, 1fr)',
				gridTemplateRows: 'repeat(6, 150px)',
				marginTop: '15px',
			}}
		>
			{monthDates}
		</Box>
	);
};

export default CalendarGrid;
