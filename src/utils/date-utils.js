import moment from 'moment';

const { getSpecificDate, getMonth, getYear } = require('./moment-utils');
const { totalDatesPerMonthView } = require('../constants/dates');

const generateArrayOfYears = range => {
	let max = new Date().getFullYear();
	let min = max - range;
	const years = [];

	for (let i = max; i >= min; i--) {
		years.push(i);
	}
	return years;
};

const yearsArray = generateArrayOfYears(100);

const getPrevMonthYear = (month, year) => {
	if (month === 1) {
		return {
			month: 12,
			year: year - 1,
		};
	} else {
		return {
			month: month - 1,
			year,
		};
	}
};

const getNextMonthYear = (month, year) => {
	if (month === 12) {
		return {
			month: 1,
			year: year + 1,
		};
	} else {
		return {
			month: month + 1,
			year,
		};
	}
};

const getDatesInMonthDisplay = (month, year) => {
	const daysInMonth = moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
	const firstWeekday = moment(`${month}-${year}`, 'MM-YYYY')
		.startOf('month')
		.weekday();
	const result = [];

	// Based on index number of firstWeekday, add number of previous month's overflow dates
	const prevMonthYear = getPrevMonthYear(month, year);
	const prevDaysInMonth = moment(
		`${prevMonthYear.month}-${prevMonthYear.year}`,
		'MM-YYYY'
	).daysInMonth();

	if (firstWeekday === 0) {
		for (let i = firstWeekday + 5; i >= 0; i--) {
			result.push({
				currentMonth: false,
				date: getSpecificDate(
					prevMonthYear.month,
					prevDaysInMonth - i,
					prevMonthYear.year
				),
				events: [],
			});
		}
	}

	for (let i = firstWeekday - 2; i >= 0; i--) {
		result.push({
			currentMonth: false,
			date: getSpecificDate(
				prevMonthYear.month,
				prevDaysInMonth - i,
				prevMonthYear.year
			),
			events: [],
		});
	}

	// Add all current month dates
	for (let j = 1; j <= daysInMonth; j++) {
		result.push({
			currentMonth: true,
			date: getSpecificDate(month, j, year),
			events: [],
		});
	}

	// Overflow dates for next month to meet totalDatesPerMonthView requirement
	if (result.length < totalDatesPerMonthView) {
		const daysToAdd = totalDatesPerMonthView - result.length;
		const nextMonthYear = getNextMonthYear(month, year);
		for (let k = 1; k <= daysToAdd; k++) {
			result.push({
				currentMonth: false,
				date: getSpecificDate(
					nextMonthYear.month,
					k,
					nextMonthYear.year
				),
				events: [],
			});
		}
	}

	return result;
};

const getMonthSet = selectDate => {
	const month = getMonth(selectDate) + 1;
	const result = {
		current: selectDate,
		prev: getSpecificDate(month - 1, 1, getYear(selectDate)),
		next: getSpecificDate(month + 1, 1, getYear(selectDate)),
	};

	if (month === 1) {
		result.prev = getSpecificDate(12, 1, getYear(selectDate) - 1);
	}

	if (month === 12) {
		result.next = getSpecificDate(1, 1, getYear(selectDate) + 1);
	}

	return result;
};

export { getDatesInMonthDisplay, getMonthSet, yearsArray };
