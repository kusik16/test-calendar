import React from 'react';
import DataPicker from 'components/dataPicker/DataPicker';

import { getMonth, getYear } from '../../utils/moment-utils';
import { getMonthSet } from '../../utils/date-utils';
import { monthsFull } from '../../constants/dates';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CalendarHeader = ({ selectDate, setSelectDate, handleModal }) => {
	const monthSet = getMonthSet(selectDate);

	return (
		<>
			<Box
				component="header"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '35px',
				}}
			>
				<Box>
					<IconButton
						color="primary"
						onClick={handleModal}
						size="large"
					>
						<AddBoxIcon fontSize="inherit" />
					</IconButton>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						width: '50%',
						paddingRight: '15px',
					}}
				>
					<IconButton
						onClick={() => setSelectDate(monthSet.prev)}
						size="small"
					>
						<KeyboardArrowLeftIcon fontSize="inherit" />
					</IconButton>
					<Box
						sx={{
							width: '120px',
							textAlign: 'center',
						}}
					>
						{`${monthsFull[getMonth(monthSet.current)]} ${getYear(
							selectDate
						)}`}
					</Box>
					<IconButton
						onClick={() => setSelectDate(monthSet.next)}
						size="small"
					>
						<KeyboardArrowRightIcon fontSize="inherit" />
					</IconButton>
					<DataPicker
						selectDate={selectDate}
						setSelectDate={setSelectDate}
					/>
				</Box>
			</Box>
		</>
	);
};

export default CalendarHeader;
