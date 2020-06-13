import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpecificTicket, addComment, chgStatus} from '../../Redux/action';
import {Redirect} from 'react-router-dom';

export const TicketView = (props) => {
	const {
		ticket_details,
		current_userid,
		current_ticket_id,
		current_ticket_resolved,
	} = useSelector((state) => state);

	const [desc, setDesc] = useState('');
	let dispatch = useDispatch();

	function handleClick() {
		let id = props.match.params.id;
		dispatch(fetchSpecificTicket(id));
	}

	function handleChg(e) {
		setDesc(e.target.value);
	}

	function handleClickReply() {
		let datetime = new Date().toISOString();
		let date = datetime.slice(0, 10);
		let time = datetime.slice(11, 19);
		let cmt_date = date + ' ' + time;
		dispatch(
			addComment({
				ticket_id: props.match.params.id,
				data: {
					description: desc,
					comment_date: cmt_date,
					commentby: current_userid,
				},
			})
		);
	}

	function handleClickStatus() {
		dispatch(
			chgStatus({
				ticket_id: current_ticket_id,
				resolved: current_ticket_resolved,
			})
		);
	}

	return (
		<>
			<div className="mx-5">
				<br />
				TICKET DETAILS
				<button className="btn btn-info" onClick={() => handleClick()}>
					get specific ticket {props.match.params.id}
				</button>
				ticket id {current_ticket_id}
				{/* ticket resolved {current_ticket_resolved} */}
				<button
					className="btn btn-secondary"
					onClick={() => handleClickStatus()}
				>
					{current_ticket_resolved == 0 ? 'CLOSE TICKET' : 'WANT TO OPEN AGAIN'}
				</button>
				<div className="text-center">
					{ticket_details &&
						ticket_details.map((ele, ind) => {
							return (
								<div>
									<div class="card">
										<div class="card-body">
											<h5 class="card-title">Subject: {ele[5]}</h5>
											<h6 class="card-subtitle mb-2 text-muted">
												comment id: {ele[6]}
											</h6>
											<h6 class="card-subtitle mb-2 text-muted">
												priority: {ele[2]}
											</h6>
											<h6 class="card-subtitle mb-2 text-muted">
												user id who made comment: {ele[9]}
											</h6>
											<h6 class="card-subtitle mb-2 text-muted">
												comment time: {ele[8]}
											</h6>
											<p class="card-text">comment: {ele[10]}</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>
				{current_ticket_resolved == 0 && ticket_details.length > 0 ? (
					<div>
						<input
							className="form-control"
							value={desc}
							name="desc"
							onChange={(e) => handleChg(e)}
							placeholder="add comment"
						/>
						<button class="btn btn-warning" onClick={() => handleClickReply()}>
							send reply
						</button>
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};
