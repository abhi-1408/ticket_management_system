import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpecificTicket, addComment} from '../../Redux/action';
import {Redirect} from 'react-router-dom';

export const TicketView = (props) => {
	const {ticket_details} = useSelector((state) => state);

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
		dispatch(addComment({ticket_id: props.match.params.id, description: desc}));
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
			{ticket_details.length > 0 ? (
				<div>
					<input
						value={desc}
						name="desc"
						onChange={(e) => handleChg(e)}
						placeholder="add comment"
					/>
					<button onClick={() => handleClickReply()}>send reply</button>
				</div>
			) : (
				''
			)}
		</>
	);
};
