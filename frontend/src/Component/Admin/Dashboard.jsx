import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllTicket} from '../../Redux/action';

export const Dashboard = (props) => {
	const {all_ticket} = useSelector((state) => state);

	const dispatch = useDispatch();

	function handleClick() {
		dispatch(fetchAllTicket());
	}

	return (
		<div>
			DASHBOARD
			<button onClick={() => handleClick()}>fetch</button>
			<table class="table">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Ticket ID</th>
						<th scope="col">USER ID</th>
						<th scope="col">Subject</th>
					</tr>
				</thead>
				<tbody>
					{all_ticket &&
						all_ticket.map((ele) => {
							return (
								<tr>
									<td>{ele[0]}</td>
									<td>{ele[1]}</td>
									<td>{ele[2]}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};
