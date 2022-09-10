import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Box from '@mui/material/Box';
import { getDayOfMonth, getReadableWeekday } from '../../utils/moment-utils';

import Event from '../event/Event';

import { selectAll } from '../event/eventsSlice';

const CalendarItem = ({ today, day }) => {
	const events = useSelector(selectAll);
	const curDayEvents = [];

	if (events.length > 0) {
		events.forEach(event => {
			if (
				moment(event.date).format('DD') ===
					moment(day.date).format('DD') &&
				moment(event.date).format('MM') ===
					moment(day.date).format('MM') &&
				moment(event.date).format('YYYY') ===
					moment(day.date).format('YYYY')
			) {
				curDayEvents.push(event);
			}
		});
	}

	return (
		<Box
			data-active-month={day.currentMonth}
			sx={{
				overflow: 'auto',
				boxShadow:
					'2px 0 0 0 rgb(229, 229, 229), 0 2px 0 0 rgb(229, 229, 229), 2px 2px 0 0 rgb(229, 229, 229), 2px 0 0 0 rgb(229, 229, 229) inset, 0 2px 0 0 rgb(229, 229, 229) inset',
				padding: '10px',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: today ? 'rgba(0, 47, 255, 0.342)' : 'inherit',
				color:
					day.currentMonth === false
						? 'rgba(0, 0, 0, 0.2)'
						: 'inherit',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '5px',
				}}
			>
				<div>{getDayOfMonth(day.date)}</div>
				<div>{getReadableWeekday(day.date)}</div>
			</Box>
			{curDayEvents.length > 0 ? (
				<Box>
					{curDayEvents.map(event => {
						return (
							<Event
								key={event.id}
								events={events}
								event={event}
							/>
						);
					})}
				</Box>
			) : null}
		</Box>
	);
};

export default CalendarItem;
