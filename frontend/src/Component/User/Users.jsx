import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpecificUserTicket} from '../../Redux/action';

export const Users = (props) => {
	const {logged_in, current_userid, user_tickets} = useSelector(
		(state) => state
	);

	let dispatch = useDispatch();

	function handleClick() {
		dispatch(fetchSpecificUserTicket(current_userid));
	}

	if (logged_in) {
		return (
			<>
				<h2>logged in user: {current_userid}</h2>
				<button onClick={() => handleClick()}>
					fetch user {current_userid}{' '}
				</button>

				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">TICKET ID</th>
							<th scope="col">SUBJECT</th>
						</tr>
					</thead>
					<tbody>
						{user_tickets &&
							user_tickets.map((ele) => {
								return (
									<tr>
										<td>{ele[3]}</td>
										<td>{ele[5]}</td>
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
