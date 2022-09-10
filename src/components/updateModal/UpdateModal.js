import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import { eventDelete, eventUpdate } from 'components/event/eventsSlice';
import validationSchema from 'components/modal/validationSchema';

const UpdateModal = ({ handleUpdateModal, event }) => {
	const {
		date,
		time,
		id,
		title,
		description,
		createEventDate,
		updateEventDate,
	} = event;

	const formik = useFormik({
		initialValues: {
			title,
			description,
			date,
			time,
		},
		validationSchema,
		onSubmit: ({ title, description, date, time }) => {
			onUpdateEvent({
				title,
				description,
				date,
				time,
			});
		},
	});

	const dispatch = useDispatch();

	const onUpdateEvent = obj => {
		const { title, description, date, time } = obj;

		dispatch(
			eventUpdate({
				id,
				changes: {
					title: title || 'no title',
					description: description || 'no desctiption',
					date: date || `Updated at ${moment().format()}`,
					time: time || moment().format(),
					updateEventDate: `Updated at ${moment().format(
						'DD-MM-YYYY HH:mm'
					)}`,
				},
			})
		);

		handleUpdateModal();
	};

	const onDeleteEvent = id => {
		dispatch(eventDelete(id));
		handleUpdateModal();
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
						marginBottom: '15px',
					}}
				>
					<Box>
						<Box
							sx={{
								fontSize: '25px',
							}}
						>
							Edit idea item
						</Box>
						<Box
							sx={{
								fontSize: '15px',
								opacity: '0.5',
							}}
						>
							{updateEventDate || createEventDate}
						</Box>
					</Box>
					<IconButton
						onClick={() => handleUpdateModal()}
						size="large"
					>
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
						backgroundColor: '#fff',
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
						alignItems: 'center',
					}}
				>
					<IconButton
						onClick={() => onDeleteEvent(id)}
						color="error"
						aria-label="delete"
						size="large"
					>
						<DeleteIcon
							sx={{
								margin: 0,
								textAlign: 'center',
								width: '20px',
							}}
							fontSize="inherit"
						/>
					</IconButton>
					<Button
						disabled={!(formik.isValid && formik.dirty)}
						type="submit"
						sx={{
							margin: '15px',
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

export default UpdateModal;
