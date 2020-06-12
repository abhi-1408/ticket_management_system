import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpecificTicket} from '../../Redux/action';
import {Redirect} from 'react-router-dom';

export const TicketView = (props) => {
	const {ticket_details} = useSelector((state) => state);

	let dispatch = useDispatch();

	function handleClick() {
		let id = props.match.params.id;
		dispatch(fetchSpecificTicket(id));
	}
	return (
		<>
			<br />
			TICKET DETAILS
			<button onClick={() => handleClick()}>get specific ticket</button>
			{ticket_details &&
				ticket_details.map((ele, ind) => {
					return (
						<div>
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Subject: {ele[2]}</h5>
									<h6 class="card-subtitle mb-2 text-muted">
										comment id: {ele[3]}
									</h6>
									<p class="card-text">comment: {ele[4]}</p>
								</div>
							</div>
						</div>
					);
				})}
		</>
	);
};
