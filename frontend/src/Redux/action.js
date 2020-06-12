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

export const loginSuccess = (payload) => {
	return {
		type: 'LOGIN_SUCCESS',
		payload: true,
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
					let {logged_in} = res.data;
					if (logged_in) {
						dispatch(loginSuccess(logged_in));
					} else {
						dispatch(loginFailure());
					}
				})
				.catch((err) => console.log('cant send data to create', err))
		);
	};
};
