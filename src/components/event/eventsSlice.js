import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const eventsAdapter = createEntityAdapter({});

const eventsSlice = createSlice({
	name: 'events',
	initialState: eventsAdapter.getInitialState(),
	reducers: {
		eventCreate: eventsAdapter.addOne,
		eventDelete: eventsAdapter.removeOne,
		eventUpdate: eventsAdapter.updateOne,
	},
});

const { actions, reducer } = eventsSlice;

export const { selectAll, selectEntities, selectIds } =
	eventsAdapter.getSelectors(state => state.events);
export default reducer;
export const { eventCreate, eventDelete, eventUpdate } = actions;
