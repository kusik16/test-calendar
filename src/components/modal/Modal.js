import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { eventCreate } from '../event/eventsSlice';
import validationSchema from './validationSchema';

const Modal = ({ handleModal }) => {
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			date: '',
			time: '',
		},
		validationSchema,
		onSubmit: ({ title, description, date, time }) => {
			onCreateEvent({
				title,
				description,
				date,
				time,
			});
		},
	});

	const dispatch = useDispatch();

	const onCreateEvent = obj => {
		const { title, description, date, time } = obj;

		const newEvent = {
			title: title || 'no title',
			description: description || 'no desctiption',
			date: date || new Date().toISOString(),
			time: time || moment().format('hh:mm'),
			createEventDate: `Created at ${moment().format(
				'DD-MM-YYYY HH:mm'
			)}`,
			id: uuidv4(),
		};

		dispatch(eventCreate(newEvent));
		handleModal();
	};

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				zIndex: 1200,
				cursor: 'auto',
			}}
		>
			<Box
				onSubmit={formik.handleSubmit}
				component="form"
				sx={{
					width: '100%',
					maxWidth: 500,
					margin: '0 auto',
					borderRadius: '5px',
					marginBottom: '25px',
					maxHeight: 'calc(100vh - 24px)',
					backgroundColor: '#fff',
					padding: '15px',
				}}
				noValidate
				autoComplete="off"
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Box
						sx={{
							fontSize: '25px',
						}}
					>
						Add new idea item
					</Box>
					<IconButton onClick={handleModal} size="large">
						<CloseIcon fontSize="inherit" />
					</IconButton>
				</Box>
				<TextField
					sx={{
						width: '100%',
						marginBottom: '15px',
					}}
					id="title"
					name="title"
					autoComplete="title"
					label="Title"
					variant="standard"
					value={formik.values.title}
					onChange={formik.handleChange}
					error={Boolean(formik.errors.title)}
					helperText={formik.errors.title}
				/>
				<TextField
					sx={{
						width: '100%',
					}}
					multiline
					rows={4}
					id="description"
					name="description"
					label="Description"
					variant="standard"
					value={formik.values.description}
					onChange={formik.handleChange}
				/>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						marginTop: '25px',
						marginBottom: '25px',
					}}
				>
					<TextField
						inputformat="DD/MM/YYYY"
						type="date"
						id="date"
						name="date"
						variant="standard"
						value={formik.values.date}
						onChange={formik.handleChange}
						error={Boolean(formik.errors.date)}
						helperText={formik.errors.date}
					/>
					<TextField
						type="time"
						id="time"
						name="time"
						variant="standard"
						value={formik.values.time}
						onChange={formik.handleChange}
						error={Boolean(formik.errors.time)}
						helperText={formik.errors.time}
					/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						disabled={!(formik.isValid && formik.dirty)}
						type="submit"
						sx={{
							margin: '15px',
							width: '10%',
						}}
						variant="contained"
					>
						Save
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Modal;
