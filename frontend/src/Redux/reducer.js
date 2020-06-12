import {ALL_TICKETS, LOGIN} from './actionTypes';

export const initState = {
	all_ticket: [{}],
	users: [{}],
	current_userid: '',
	user_tickets: [{}],
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
				current_userid: payload,
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
				current_userid: '',
				user_tickets: [{}],
			};

		case 'SPECIFIC_TICKET_SUCCESS':
			return {
				...state,
				user_tickets: payload,
			};

		default:
			return state;
	}
};
