import { configureStore } from '@reduxjs/toolkit';
import reducer from '../components/event/eventsSlice';

const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		localStorage.setItem('events', JSON.stringify(getState()));
		return result;
	};
};

const reHydrateStore = () => {
	if (localStorage.getItem('events') !== null) {
		return JSON.parse(localStorage.getItem('events')); // re-hydrate the store
	}
};

const store = configureStore({
	reducer: {
		events: reducer,
	},
	preloadedState: reHydrateStore(),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(localStorageMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
