import React from 'react';

import Calendar from '../calendar/Calendar';
import Box from '@mui/material/Box';

const App = () => {
	return (
		<Box sx={{ maxWidth: '1440px', margin: '0 auto' }}>
			<Calendar
				onDateSelect={date => {
					return date;
				}}
			/>
		</Box>
	);
};

export default App;
