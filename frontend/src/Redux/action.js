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
			.then((res) => console.log('data got from axios request: ', res))
			.then((res) => dispatch(allTicketSuccess(res.all_ticket)))
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const loginSuccess = (payload) => {
	return {
		type: LOGIN,
		payload: 'none',
	};
};

export const loginUser = (payload) => {
	console.log('chg auth clicked', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/login',
			method: 'POST',
			data: payload,
		})
			.then((res) => console.log('data got from login request: ', res))
			.then((res) => dispatch(loginSuccess()))
			.catch((err) => console.log('cant send data to create', err));
	};
};
