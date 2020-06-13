import {ALL_TICKETS, LOGIN} from './actionTypes';

export const initState = {
	all_ticket: [{}],
	current_user_detail: [{}],
	current_userid: '',
	user_tickets: [{}],
	logged_in: false,
	isAdmin: 0,
	wrong_cred: false,
	ticket_details: [],
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
				current_userid: payload['user_id'],
				current_user_detail: payload['user_detail'],
				logged_in: true,
				wrong_cred: false,
				ticket_details: [],
				isAdmin: payload['user_detail'][0][2],
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
				current_user_detail: [],
				user_tickets: [{}],
				ticket_details: [],
				isAdmin: 0,
			};

		case 'SPECIFIC_USER_TICKET_SUCCESS':
			return {
				...state,
				user_tickets: payload,
			};

		case 'SPECIFIC_TICKET_SUCCESS':
			return {
				...state,
				ticket_details: payload,
			};

		default:
			return state;
	}
};
