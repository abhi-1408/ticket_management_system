import React, {useState, useEffect} from 'react';
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

	//for description,storing reply
	const [desc, setDesc] = useState('');
	let dispatch = useDispatch();

	const [load, setLoad] = useState('');

	useEffect(() => {
		let id = props.match.params.id;
		dispatch(fetchSpecificTicket(id));
	}, []);

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
				current_userid: current_userid,
			})
		);
	}

	return (
		<>
			<div className="mx-5">
				<br />
				<div className="container">
					<div className="row">
						<div className="col">
							<h4>TICKET DETAILS</h4>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<h4>ticket id {current_ticket_id}</h4>
						</div>
						<div className="col">
							<button
								className="btn btn-info"
								onClick={() => handleClickStatus()}
							>
								{current_ticket_resolved == 0
									? 'CLOSE TICKET'
									: 'WANT TO OPEN AGAIN'}
							</button>
						</div>
					</div>
					<div className="row my-5 mx-2"></div>
					{/* <button className="btn btn-info" onClick={() => handleClick()}>
					get specific ticket {props.match.params.id}
				</button> */}

					{/* ticket resolved {current_ticket_resolved} */}

					<div className="text-center">
						{ticket_details &&
							ticket_details.map((ele, ind) => {
								return (
									<div className="row my-2">
										<div className="col">
											<div class="card" style={{width: '22rem'}}>
												<div class="card-header bg-secondary text-white">
													Subject: {ele[6]}
												</div>
												<div class="card-body text-left">
													<ul class="list-group list-group-flush text-muted">
														<li class="list-group-item">
															comment id: {ele[7]}
														</li>
														<li class="list-group-item">priority: {ele[2]}</li>
														<li class="list-group-item">
															user id who made comment: {ele[10]}
														</li>
														<li class="list-group-item">
															comment time: {ele[9]}
														</li>
														<li class="list-group-item">
															company id: {ele[4]}
														</li>
													</ul>
													{/* </div> */}
													{/* <h5 class="card-title">Subject</h5> */}
													{/* <h6 class="card-subtitle mb-2 text-muted">
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
											</h6> */}
													<div class="card-body">
														{/* <hr /> */}
														<h5 class="card-title text-justify">
															comment: {ele[11]}
														</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
					</div>

					{current_ticket_resolved == 0 && ticket_details.length > 0 ? (
						<div className="row py-4">
							<div className="col py-4">
								<input
									style={{width: '22rem', height: '12rem'}}
									className="form-control py-2"
									value={desc}
									name="desc"
									onChange={(e) => handleChg(e)}
									placeholder="add comment"
								/>
								<button
									class="btn btn-warning"
									onClick={() => handleClickReply()}
								>
									send reply
								</button>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
};
