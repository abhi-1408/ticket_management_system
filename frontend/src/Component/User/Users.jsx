import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpecificUserTicket} from '../../Redux/action';
import {Link, Redirect} from 'react-router-dom';
import {Charts} from '../Admin/Charts';

export const Users = (props) => {
	const {
		logged_in,
		current_userid,
		user_tickets,
		isAdmin,
		current_user_detail,
		company_dict,
	} = useSelector((state) => state);

	let dispatch = useDispatch();

	function handleClick() {
		dispatch(fetchSpecificUserTicket(current_userid));
	}

	if (logged_in) {
		return (
			<>
				<div className="container">
					<div className="row">
						<div className="col h3">
							logged in user: {current_user_detail[0][1]}
						</div>
						<div className="col h3">{isAdmin == 0 ? 'User' : 'Admin'}</div>
					</div>
					<div className="row mb-2">
						<div className="col h4">Phone: {current_user_detail[0][3]}</div>
						<div className="col h4">Email: {current_user_detail[0][4]} </div>
					</div>
					<div className="row mb-5">
						<div className="col">
							<Link
								className="btn btn-warning "
								to={`/create/${current_userid}`}
							>
								CREATE NEW TICKET
							</Link>

							{isAdmin == 1 ? (
								<Link className="btn btn-info mx-2" to="/createcomp">
									CREATE NEW COMPANY
								</Link>
							) : (
								''
							)}
						</div>
					</div>

					{/* <button className="btn btn-info" onClick={() => handleClick()}>
					fetch user tickets{current_userid}{' '}
				</button> */}
					{isAdmin == 1 ? (
						<div>
							<Charts />
						</div>
					) : (
						<div></div>
					)}
					{isAdmin == 1 ? (
						''
					) : (
						<table class="table my-5">
							<thead class="thead-dark">
								<tr>
									<th scope="col">TICKET ID</th>
									<th scope="col">Priority</th>
									<th scope="col">Resolved</th>

									<th scope="col">Company ID</th>
									<th scope="col">Creation Time</th>
									<th scope="col">SUBJECT</th>
								</tr>
							</thead>
							<tbody>
								{user_tickets &&
									user_tickets.map((ele) => {
										if (ele[7] == 0) {
											return (
												<tr style={{color: 'red'}}>
													<td>
														<Link to={`/target/${ele[6]}`}> {ele[6]}</Link>
													</td>
													<td>{ele[8]}</td>
													<td>{ele[7]}</td>
													<td>{company_dict[ele[10]]}</td>
													<td>{ele[11]}</td>
													<td>{ele[12]}</td>
												</tr>
											);
										} else {
											return (
												<tr style={{color: 'green'}}>
													<td>
														<Link to={`/target/${ele[6]}`}> {ele[6]}</Link>
													</td>
													<td>{ele[8]}</td>
													<td>{ele[7]}</td>
													<td>{company_dict[ele[10]]}</td>
													<td>{ele[11]}</td>
													<td>{ele[12]}</td>
												</tr>
											);
										}
									})}
							</tbody>
						</table>
					)}
				</div>
			</>
		);
	} else {
		return <div className="text-center">NOT LOGGED IN</div>;
	}
};
