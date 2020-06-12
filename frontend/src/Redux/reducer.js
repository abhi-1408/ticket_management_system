import {ALL_TICKETS, LOGIN} from './actionTypes';

export const initState = {
	all_ticket: [{}],
	users: [{}],
	ticket_detail: [{}],
	logged_in: false,
	wrong_cred: false,
};

export default (state = initState, {type, payload}) => {
	console.log('state is', state, 'payload', payload, 'type is', type);

	switch (type) {
		case ALL_TICKETS:
			return {
				...state,
				all_ticket: payload,
			};

		case 'LOGIN_SUCCESS':
			return {
				...state,
				logged_in: true,
				wrong_cred: false,
			};

		case 'LOGIN_FAILURE':
			return {
				...state,
				logged_in: false,
				wrong_cred: true,
			};

		case 'LOGOUT_USER':
			return {
				...state,
				logged_in: false,
				wrong_cred: false,
			};

		default:
			return state;
	}
};
