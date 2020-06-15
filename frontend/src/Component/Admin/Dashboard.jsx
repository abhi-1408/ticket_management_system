import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllTicket, setCurrentPage, sortTicket} from '../../Redux/action';
import {Link} from 'react-router-dom';
import {Charts} from './Charts';

export const Dashboard = (props) => {
	const {
		all_ticket,
		page_all_tickets,
		current_page,
		page_size,
		current_page_data,
		sortStatus,
		company_dict,
	} = useSelector((state) => state);

	const dispatch = useDispatch();
	const [load, setLoad] = useState('');

	useEffect(() => {
		dispatch(fetchAllTicket());
	}, []);

	function handleClick() {
		dispatch(fetchAllTicket());
	}

	function chgPage(e) {
		let pageNo = e.target.id;
		dispatch(setCurrentPage(pageNo));
	}

	function sortData() {
		dispatch(sortTicket());
		dispatch(setCurrentPage('1'));
	}

	return (
		<div>
			{/* pagination data */}

			<table class="table">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Ticket ID</th>
						<th scope="col">
							<button
								className="btn font-weight-bold text-white bg-dark p-0 m-0"
								onClick={() => sortData()}
							>
								RESOLVED{sortStatus ? '↑' : '↓'}
							</button>
						</th>
						<th scope="col">Priority</th>
						<th scope="col">Created by User ID</th>
						<th scope="col">Company ID</th>
						<th scope="col">Creation Time</th>
						<th scope="col">Subject</th>
					</tr>
				</thead>
				{current_page_data &&
					current_page_data.map(
						(ele, ind) => {
							if (ele[1] == 0) {
								if (ele[2] == 'high') {
									return (
										<tr style={{color: 'red'}}>
											<td>
												<Link to={`/target/${ele[0]}`}> {ele[0]}</Link>
											</td>

											<td>open</td>
											<td>{ele[2]}</td>
											<td>{ele[3]}</td>
											<td>{company_dict[ele[4]]}</td>
											<td>{ele[5]}</td>
											<td>{ele[6]}</td>
										</tr>
									);
								} else {
									return (
										<tr style={{color: 'blue'}}>
											<td>
												<Link to={`/target/${ele[0]}`}> {ele[0]}</Link>
											</td>

											<td>open</td>
											<td>{ele[2]}</td>
											<td>{ele[3]}</td>
											<td>{company_dict[ele[4]]}</td>
											<td>{ele[5]}</td>
											<td>{ele[6]}</td>
										</tr>
									);
								}
							} else {
								return (
									<tr style={{color: 'green'}}>
										<td>
											<Link to={`/target/${ele[0]}`}> {ele[0]}</Link>
										</td>

										<td>resolved</td>
										<td>{ele[2]}</td>
										<td>{ele[3]}</td>
										<td>{company_dict[ele[4]]}</td>
										<td>{ele[5]}</td>
										<td>{ele[6]}</td>
									</tr>
								);
							}
							// if (ind + 1 == current_page) {
							// for (let i = 0; i <= elem.length && page_size; i++) {
							// 	<tr style={{color: 'green'}}>
							// 		<td>
							// 			<Link to={`/target/${elem[i][0]}`}> {elem[i][0]}</Link>
							// 		</td>
							// 		<td>{elem[i][1]}</td>
							// 		<td>{elem[i][2]}</td>
							// 		<td>{elem[i][3]}</td>
							// 		<td>{elem[i][4]}</td>
							// 		<td>{elem[i][5]}</td>
							// 	</tr>;
							// }
						}
						// return (
						// <tr>
						// 	<td>{ind + 1}</td>
						// 	<td>{elem[0]}</td>
						// 	<td>{elem[1]}</td>
						// </tr>
						// );
					)}
				<tbody></tbody>
			</table>
			<nav>
				<ul class="pagination justify-content-center">
					{page_all_tickets &&
						page_all_tickets.map((ele, ind) => {
							return (
								<li class="page-item">
									<button
										className="page-link"
										id={ind + 1}
										onClick={(e) => chgPage(e)}
									>
										{ind + 1}
									</button>
								</li>
							);
						})}
				</ul>
			</nav>
		</div>
	);
};
