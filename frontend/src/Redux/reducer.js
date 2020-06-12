import {ALL_TICKETS, LOGIN} from './actionTypes';

export const initState = {
	all_ticket: [{}],
	users: [{}],
	ticket_detail: [{}],
	logged_in: false,
};

export default (state = initState, {type, payload}) => {
	console.log('state is', state, 'payload', payload, 'type is', type);

	switch (type) {
		case ALL_TICKETS:
			return {
				...state,
				all_ticket: payload,
			};

		case LOGIN:
			return {
				...state,
				logged_in: true,
			};

		default:
			return state;
	}
};
