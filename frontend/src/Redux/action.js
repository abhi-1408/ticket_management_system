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
			.then((res) => {
				// dispatch(loadChartsData());
				dispatch(fetchCompanyList());
				dispatch(allTicketSuccess(res.data.all_ticket));
			})
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
			.then((res) => {
				dispatch(fetchCompanyList());
				dispatch(specificUserTicketSuccess(res.data.user_tickets));
			})
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
			.then((res) => {
				dispatch(fetchSpecificUserTicket(payload['user_id']));
				// dispatch(loadChartsData());
			})
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
			.then((res) =>
				dispatch(
					specificTicketSuccess({
						user_ticket: res.data.ticket_detail,
						ticket_id: payload,
						ticket_resolved: res.data.ticket_detail[0][1],
					})
				)
			)
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const chgStatus = (payload) => {
	console.log('fetch specific ticket', payload);
	let resolved = payload['resolved'];
	if (resolved == 1) {
		resolved = 0;
	} else {
		resolved = 1;
	}
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/chgstatus/' + payload['ticket_id'],
			method: 'POST',
			data: {resolved: resolved},
		})
			.then((res) => {
				// dispatch(loadChartsData());
				dispatch(fetchSpecificUserTicket(payload['current_userid']));
				dispatch(fetchSpecificTicket(payload['ticket_id']));
			})
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

export const tokenVerifer = (payload) => {
	console.log('token verifier clicked', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/authtoken',
			method: 'POST',
			data: payload,
		})
			.then((res) => {
				return res;
			})
			.catch((err) => console.log('cant send data to create', err));
	};
};

export const loadSpecificData = (payload) => {
	return (dispatch) => {
		dispatch(fetchSpecificUserTicket(payload));
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
			.then((res) => {
				return dispatch(tokenVerifer(res.data));
			})
			.then((res) => {
				console.log('res is', res);
				// const {data} = res;
				let {logged_in, user_id, user_data} = res.data;
				if (logged_in) {
					dispatch(loadSpecificData(user_id));
					dispatch(loginSuccess({user_id: user_id, user_detail: user_data}));
				} else {
					dispatch(loginFailure());
				}
			})
			.catch((err) => console.log('cant send data to create', err));
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
				data: payload['data'],
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

export const setCurrentPage = (payload) => {
	return {
		type: 'SET_CURRENT_PAGE',
		payload: payload,
	};
};

export const registerStarted = (payload) => {
	return {
		type: 'REGISTER_STARTED',
		payload: 1,
	};
};

export const registerSuccess = (payload) => {
	return {
		type: 'REGISTER_SUCCESS',
		payload: 2,
	};
};

export const registerReset = (payload) => {
	return {
		type: 'REGISTER_RESET',
		payload: 0,
	};
};

export const registerFailure = (payload) => {
	return {
		type: 'REGISTER_FAILURE',
		payload: -1,
	};
};

export const registerUser = (payload) => {
	console.log('register user clicked', payload);
	return (dispatch) => {
		dispatch(registerStarted());
		return (
			axios({
				url: 'http://127.0.0.1:5000/signup',
				method: 'POST',
				data: payload,
			})
				// .then((res) => console.log('data got from login request: ', res))
				.then((res) => {
					console.log('res is', res);
					// const {data} = res;
					dispatch(registerSuccess());
					// dispatch(fetchSpecificTicket(res.data['ticket_id']));
				})
				.catch((err) => {
					dispatch(registerFailure());
					console.log('cant send data to create', err);
				})
		);
	};
};

export const loadChartSuccess = (payload) => {
	return {
		type: 'LOAD_CHART_SUCCESS',
		payload: payload,
	};
};

export const loadChartsData = (payload) => {
	console.log('load chart data called', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/chart',
			method: 'GET',
		})
			.then((res) => {
				console.log('***************LOADING CHART DATA : ', res);
				return res;
			})
			.then((res) => {
				dispatch(
					loadChartSuccess({
						ticket_respective_company: res.data.ticket_respective_company,
						ticket_by_date: res.data.ticket_by_date,
						tickets_status: res.data.tickets_status,
					})
				);
			})
			.catch((err) => console.log('cant send data to charts', err));
	};
};

export const fetchCompanySuccess = (payload) => {
	return {
		type: 'FETCH_COMPANY_LIST',
		payload: payload,
	};
};

export const fetchCompanyList = (payload) => {
	console.log('load chart data called', payload);
	return (dispatch) => {
		return axios({
			url: 'http://127.0.0.1:5000/companylist',
			method: 'GET',
		})
			.then((res) => {
				dispatch(fetchCompanySuccess(res.data));
			})
			.catch((err) => console.log('cant send data to charts', err));
	};
};
