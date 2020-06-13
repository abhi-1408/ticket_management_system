import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpecificUserTicket} from '../../Redux/action';
import {Link, Redirect} from 'react-router-dom';

export const Users = (props) => {
	const {
		logged_in,
		current_userid,
		user_tickets,
		current_user_detail,
	} = useSelector((state) => state);

	let dispatch = useDispatch();

	function handleClick() {
		dispatch(fetchSpecificUserTicket(current_userid));
	}

	if (logged_in) {
		return (
			<>
				<h2>logged in user: {current_user_detail[0][1]}</h2>
				<h3>
					Phone: {current_user_detail[0][3]} Email: {current_user_detail[0][4]}{' '}
				</h3>
				<button onClick={() => handleClick()}>
					fetch user tickets{current_userid}{' '}
				</button>
				<Link to={`/create/${current_userid}`}>CREATE NEW TICKET</Link>

				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">TICKET ID</th>
							<th scope="col">Priority</th>
							<th scope="col">Creation Time</th>
							<th scope="col">SUBJECT</th>
						</tr>
					</thead>
					<tbody>
						{user_tickets &&
							user_tickets.map((ele) => {
								return (
									<tr>
										<td>
											<Link to={`/target/${ele[6]}`}> {ele[6]}</Link>
										</td>
										<td>{ele[8]}</td>
										<td>{ele[10]}</td>
										<td>{ele[11]}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</>
		);
	} else {
		return <div>NOT LOGGED IN</div>;
	}
};
