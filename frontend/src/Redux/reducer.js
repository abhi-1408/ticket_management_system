import {ALL_TICKETS, LOGIN} from './actionTypes';

export const initState = {
	all_ticket: [{}],
	current_user_detail: [{}],
	current_userid: '',
	current_ticket_id: '',
	current_ticket_resolved: '',
	user_tickets: [{}],
	logged_in: false,
	isAdmin: 0,
	wrong_cred: false,
	ticket_details: [],
	page_all_tickets: [{}],
	current_page: 1,
	current_page_data: [],
	page_size: 4,
	register_success: 0,
	ticket_respective_company: [],
	ticket_by_date: [],
	tickets_status: [],
	company_list: [],
	sortStatus: false,
	company_dict: {},
	company_add_flag: false,
};

export default (state = initState, {type, payload}) => {
	console.log('state is', state, 'payload', payload, 'type is', type);

	switch (type) {
		case ALL_TICKETS:
			let pageSize = 4;
			let count = 1;
			let temp = [];
			let page_all = [];
			// to get the elements according to the page size and save in as an array of arrsys
			for (let i = 0; i < payload.length; i++) {
				if (count < pageSize) {
					temp.push(payload[i]);
					count++;
				} else if (count == pageSize) {
					temp.push(payload[i]);
					count = 1;
					page_all.push(temp);
					temp = [];
				}
			}
			if (temp.length > 0) {
				page_all.push(temp);
			}
			// let no_of_pages=page_all.length
			return {
				...state,
				all_ticket: payload,
				page_all_tickets: page_all,
				current_page: 1,
				current_page_data: page_all[0],
			};

		case 'SET_CURRENT_PAGE':
			let temp1;
			// to get only the page elements which is requested
			let t = state.page_all_tickets.filter((elem, ind) => {
				if (ind + 1 == payload) {
					// console.log('elem is in current page', elem, elem[0]);
					temp1 = elem;
					return elem;
				}
			});
			// console.log('t we get is', t);
			console.log('temp we get is', temp1);
			return {
				...state,
				current_page: payload,
				current_page_data: temp1,
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
				register_success: 0,
			};

		case 'LOGIN_FAILURE':
			return {
				...state,
				logged_in: false,
				wrong_cred: true,
				register_success: 0,
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
				current_ticket_resolved: '',
				current_ticket_id: '',
				register_success: 0,
			};

		case 'REGISTER_STARTED':
			return {
				...state,
				register_success: payload,
			};

		case 'REGISTER_SUCCESS':
			return {
				...state,
				register_success: payload,
			};

		case 'REGISTER_FAILURE':
			return {
				...state,
				register_success: payload,
			};

		case 'REGISTER_RESET':
			return {
				...state,
				register_success: 0,
			};

		case 'SPECIFIC_USER_TICKET_SUCCESS':
			return {
				...state,
				user_tickets: payload,
			};

		case 'SPECIFIC_TICKET_SUCCESS':
			return {
				...state,
				ticket_details: payload['user_ticket'],
				current_ticket_id: payload['ticket_id'],
				current_ticket_resolved: payload['ticket_resolved'],
			};

		case 'LOAD_CHART_SUCCESS':
			return {
				...state,
				ticket_respective_company: payload.ticket_respective_company,
				ticket_by_date: payload.ticket_by_date,
				tickets_status: payload.tickets_status,
			};

		case 'FETCH_COMPANY_LIST':
			let dict1 = {};
			let tt = payload.company_list;
			for (let i = 0; i < tt.length; i++) {
				dict1[tt[i][1]] = tt[i][0];
			}

			console.log(
				'*****************fectch company list reducer',
				dict1,
				dict1['10000']
			);
			return {
				...state,
				company_list: payload.company_list,
				company_dict: dict1,
			};

		case 'FETCH_COMPANY_RESET_FLAG':
			return {
				...state,
				company_add_flag: payload,
			};

		case 'SORT_TICKET':
			console.log('sorting in reducer');
			let arr = state.all_ticket;
			if (state.sortStatus) {
				arr.sort(function (a, b) {
					if (Number(a[1]) < Number(b[1])) {
						return -1;
					} else if (Number(a[1]) > Number(b[1])) {
						return 1;
					} else if (Number(a[1]) == Number(b[1])) {
						return 0;
					}
				});
			} else {
				arr.sort(function (a, b) {
					if (Number(a[1]) < Number(b[1])) {
						return 1;
					} else if (Number(a[1]) > Number(b[1])) {
						return -1;
					} else if (Number(a[1]) == Number(b[1])) {
						return 0;
					}
				});
			}

			let s_pageSize = 4;
			let s_count = 1;
			let s_temp = [];
			let s_page_all = [];
			// to get the elements according to the page size and save in as an array of arrsys
			for (let i = 0; i < arr.length; i++) {
				if (s_count < s_pageSize) {
					s_temp.push(arr[i]);
					s_count++;
				} else if (s_count == s_pageSize) {
					s_temp.push(arr[i]);
					s_count = 1;
					s_page_all.push(s_temp);
					s_temp = [];
				}
			}
			if (s_temp.length > 0) {
				s_page_all.push(s_temp);
			}

			return {
				...state,
				sortStatus: !state.sortStatus,
				all_ticket: arr,
				page_all_tickets: s_page_all,
				current_page: 1,
				current_page_data: s_page_all[0],
			};

		default:
			return state;
	}
};
