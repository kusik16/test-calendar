import React, { useState } from 'react';

import Box from '@mui/material/Box';
import UpdateModal from '../updateModal/UpdateModal';

const Event = ({ event }) => {
	const [isUpdateModalShow, setIsUpdateModalShow] = useState(false);

	const handleUpdateModal = () => {
		setIsUpdateModalShow(!isUpdateModalShow);
	};

	return (
		<>
			<Box
				sx={{
					backgroundColor: '#e4e4e4',
					fontSize: '15px',
					paddingLeft: '3px',
					marginBottom: '10px',
					borderRadius: '5px',
					cursor: 'pointer',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
				className="day__events_event"
				onClick={() => handleUpdateModal()}
			>
				{event.title}
			</Box>
			{isUpdateModalShow ? (
				<UpdateModal
					handleUpdateModal={handleUpdateModal}
					event={{
						id: event.id,
						title: event.title,
						description: event.description,
						date: event.date,
						time: event.time,
						createEventDate: event.createEventDate,
						updateEventDate: event.updateEventDate || '',
					}}
				/>
			) : null}
		</>
	);
};

export default Event;
