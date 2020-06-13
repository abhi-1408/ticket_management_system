import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllTicket} from '../../Redux/action';
import {Link} from 'react-router-dom';

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
						<th scope="col">Resolved</th>
						<th scope="col">Priority</th>
						<th scope="col">Created by User ID</th>
						<th scope="col">Creation Time</th>
						<th scope="col">Subject</th>
					</tr>
				</thead>
				<tbody>
					{all_ticket &&
						all_ticket.map((ele) => {
							return (
								<tr>
									<td>
										<Link to={`/target/${ele[0]}`}> {ele[0]}</Link>
									</td>
									<td>{ele[1]}</td>
									<td>{ele[2]}</td>
									<td>{ele[3]}</td>
									<td>{ele[4]}</td>
									<td>{ele[5]}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};
