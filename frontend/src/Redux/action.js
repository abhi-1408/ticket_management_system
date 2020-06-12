import {ALL_TICKETS, LOGIN} from './actionTypes';
import axios from 'axios';

export const allTicketSuccess = (payload) => {
	return {
		type: ALL_TICKETS,
		payload: payload,
	};
};

export const fetchAllTicket = (payload) => {
	console.log('fetch all ticket', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/alltickets',
			method: 'GET',
		})
			.then((res) => {
				console.log('data got from axios request: ', res);
				return res;
			})
			.then((res) => dispatch(allTicketSuccess(res.data.all_ticket)))
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const specificUserTicketSuccess = (payload) => {
	return {
		type: 'SPECIFIC_USER_TICKET_SUCCESS',
		payload: payload,
	};
};

export const fetchSpecificUserTicket = (payload) => {
	console.log('fetch specific ticket', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/' + payload + '/ticket',
			method: 'GET',
		})
			.then((res) => {
				console.log('data got from specific fetch user ticket request: ', res);
				return res;
			})
			.then((res) => dispatch(specificUserTicketSuccess(res.data.user_tickets)))
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const createTicket = (payload) => {
	console.log('create ticket clicked', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/addticket/' + payload['user_id'],
			method: 'POST',
			data: payload['data'],
		})
			.then((res) => {
				console.log('data got from create ticket: ', res);
				return res;
			})
			.then((res) => dispatch(fetchSpecificUserTicket(payload['user_id'])))
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const specificTicketSuccess = (payload) => {
	return {
		type: 'SPECIFIC_TICKET_SUCCESS',
		payload: payload,
	};
};

export const fetchSpecificTicket = (payload) => {
	console.log('fetch specific ticket', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/ticket/' + payload,
			method: 'GET',
		})
			.then((res) => {
				console.log('data got from specific fetch user ticket request: ', res);
				return res;
			})
			.then((res) => dispatch(specificTicketSuccess(res.data.ticket_detail)))
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const loginSuccess = (payload) => {
	return {
		type: 'LOGIN_SUCCESS',
		payload: payload,
	};
};

export const loginFailure = (payload) => {
	return {
		type: 'LOGIN_FAILURE',
		payload: false,
	};
};

export const logoutUser = (payload) => {
	return {
		type: 'LOGOUT_USER',
		payload: 'none',
	};
};

export const loginUser = (payload) => {
	console.log('chg auth clicked', payload);
	return (dispatch) => {
		return (
			axios({
				url: 'http://127.0.0.1:5000/login',
				method: 'POST',
				data: payload,
			})
				// .then((res) => console.log('data got from login request: ', res))
				.then((res) => {
					console.log('res is', res);
					// const {data} = res;
					let {logged_in, user_id} = res.data;
					if (logged_in) {
						dispatch(loginSuccess(user_id));
					} else {
						dispatch(loginFailure());
					}
				})
				.catch((err) => console.log('cant send data to create', err))
		);
	};
};

export const addingCommentSuccess = (payload) => {
	return {
		type: 'COMMENT_SUCCESS',
		payload: 'none',
	};
};

export const addComment = (payload) => {
	console.log('add comment clicked', payload);
	return (dispatch) => {
		return (
			axios({
				url: 'http://127.0.0.1:5000/addcmt/' + payload['ticket_id'],
				method: 'POST',
				data: {description: payload['description']},
			})
				// .then((res) => console.log('data got from login request: ', res))
				.then((res) => {
					console.log('res is', res);
					// const {data} = res;
					dispatch(fetchSpecificTicket(res.data['ticket_id']));
				})
				.catch((err) => console.log('cant send data to create', err))
		);
	};
};
