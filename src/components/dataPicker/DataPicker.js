import { useState } from 'react';
import moment from 'moment/moment';

import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import { monthsFull } from 'constants/dates';
import { yearsArray } from '../../utils/date-utils';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 100,
		},
	},
};

const DataPicker = ({ setSelectDate }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const [month, setMonth] = useState(moment().month());
	const [year, setYear] = useState(moment().year());

	const handleChangeMonth = event => {
		setMonth(event.target.value);
		setSelectDate(moment().month(event.target.value).year(year));
	};

	const handleChangeYear = event => {
		setYear(event.target.value);
		setSelectDate(moment().month(month).year(event.target.value));
	};

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<>
			<IconButton
				onClick={handleClick}
				aria-label="date-picker"
				size="large"
			>
				<CalendarMonthIcon fontSize="inherit" />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box sx={{ padding: '5px' }}>
					<FormControl sx={{ m: 1, minWidth: 80 }}>
						<InputLabel id="demo-simple-select-autowidth-label">
							Month
						</InputLabel>
						<Select
							labelId="demo-simple-select-autowidth-label"
							id="demo-simple-select-autowidth"
							value={month}
							onChange={handleChangeMonth}
							autoWidth
							label="Month"
						>
							{monthsFull.map((month, i) => {
								return (
									<MenuItem key={i} value={i}>
										{month}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 80 }}>
						<InputLabel id="demo-simple-select-autowidth-label">
							Year
						</InputLabel>
						<Select
							sx={{ maxHeight: 200 }}
							labelId="demo-simple-select-autowidth-label"
							id="demo-simple-select-autowidth"
							value={year}
							onChange={handleChangeYear}
							autoWidth
							label="Year"
							MenuProps={MenuProps}
						>
							{yearsArray.map((year, i) => {
								return (
									<MenuItem key={i} value={year}>
										{year}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Box>
			</Popover>
		</>
	);
};

export default DataPicker;
