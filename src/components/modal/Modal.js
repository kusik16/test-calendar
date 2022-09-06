import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import './modal.scss';

const Modal = ({ setEvents, events, handleModal }) => {
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const onCreateEvent = e => {
		e.preventDefault();

		const newEvent = {
			title: title || 'no title',
			description: description || 'no desctiption',
			date: date || moment().format(),
			time: time || moment().format(),
			createEventDate: `Created at ${moment().format(
				'DD-MM-YYYY HH:mm'
			)}`,
			id: uuidv4(),
		};

		setEvents([newEvent, ...events]);
		localStorage.setItem('events', JSON.stringify([newEvent, ...events]));
		handleModal();
	};

	return (
		<div className="overlay">
			<Box
				className="modal"
				onSubmit={e => onCreateEvent(e)}
				component="form"
				sx={{
					width: '100%',
					maxWidth: 500,
					margin: '0 auto',
					borderRadius: '5px',
					marginBottom: '25px',
				}}
				noValidate
				autoComplete="off"
			>
				<div className="modal__header">
					<div className="modal__header_title">Add new idea item</div>
					<IconButton onClick={() => handleModal()} size="large">
						<CloseIcon fontSize="inherit" />
					</IconButton>
				</div>
				<TextField
					sx={{
						width: '100%',
						marginBottom: '15px',
					}}
					id="name"
					label="Title"
					variant="standard"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<TextField
					sx={{
						width: '100%',
					}}
					multiline
					rows={4}
					id="name"
					label="Description"
					variant="standard"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<div className="modal__dates">
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DesktopDatePicker
							label="Date"
							inputFormat="DD/MM/YYYY"
							value={date}
							onChange={newValue => {
								setDate(newValue);
							}}
							renderInput={params => (
								<TextField
									variant="standard"
									sx={{
										backgroundColor: '#fff',
									}}
									{...params}
								/>
							)}
						/>
						<TimePicker
							label="Begin time"
							inputFormat="HH:mm"
							value={time}
							onChange={newValue => {
								setTime(newValue);
							}}
							renderInput={params => (
								<TextField
									variant="standard"
									sx={{
										width: '30%',
										backgroundColor: '#fff',
									}}
									{...params}
								/>
							)}
						/>
					</LocalizationProvider>
				</div>
				<div className="modal__buttons">
					<Button
						type="submit"
						sx={{
							margin: '15px',
							width: '10%',
						}}
						variant="contained"
					>
						Save
					</Button>
				</div>
			</Box>
		</div>
	);
};

export default Modal;
