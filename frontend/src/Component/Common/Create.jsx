import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTicket} from '../../Redux/action';
import {Link, Redirect} from 'react-router-dom';

export const Create = (props) => {
	const {current_userid, company_list} = useSelector((state) => state);

	const [subject, setSubject] = useState('');
	const [resolved, setResolved] = useState('0');
	const [priority, setPriority] = useState('low');
	const [description, setDescription] = useState('');
	const [company_id, setCompId] = useState('10000');

	function handleChg(e) {
		if (e.target.name == 'subject') {
			setSubject(e.target.value);
		} else if (e.target.name == 'description') {
			setDescription(e.target.value);
		} else if (e.target.name == 'resolved') {
			setResolved(e.target.value);
		} else if (e.target.name == 'priority') {
			setPriority(e.target.value);
		} else if (e.target.name == 'company_id') {
			setCompId(e.target.value);
		}
	}

	const dispatch = useDispatch();

	function handleClick() {
		let datetime = new Date().toISOString();
		let date = datetime.slice(0, 10);
		let time = datetime.slice(11, 19);
		let creation_time = date + ' ' + time;

		dispatch(
			createTicket({
				user_id: props.match.params.id,
				data: {
					description: description,
					subject: subject,
					resolved: resolved,
					priority: priority,
					user_id: current_userid,
					company_id: company_id,
					creation_time: creation_time,
				},
			})
		);
		props.history.push(`/user/${props.match.params.id}`);
	}

	return (
		<div className="text-center mx-5">
			<h3>CREATE NEW TICKET USER{props.match.params.id}</h3>
			<label>Subject</label>
			<input
				className="form-control"
				name="subject"
				value={subject}
				onChange={(e) => handleChg(e)}
				placeholder="subject"
			/>
			<label>Company ID</label>
			<select
				className="form-control"
				name="company_id"
				onChange={(e) => handleChg(e)}
			>
				{company_list.map((ele) => {
					return <option value={ele[1]}>{ele[0]}</option>;
				})}
			</select>
			<label>Description</label>
			<input
				className="form-control"
				name="description"
				value={description}
				onChange={(e) => handleChg(e)}
				placeholder="description"
			/>
			<label>Resolved</label>
			{/* <input
				className="form-control"
				name="resolved"
				value={resolved}
				onChange={(e) => handleChg(e)}
				placeholder="resolved 0/1"
			/> */}
			<div className="form-control">
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="radio"
						name="resolved"
						value="0"
						onClick={(e) => handleChg(e)}
					/>
					<label class="form-check-label">No</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="radio"
						name="resolved"
						value="1"
						onClick={(e) => handleChg(e)}
					/>
					<label class="form-check-label">Yes</label>
				</div>
			</div>
			<label>Priority</label>
			{/* <input
				className="form-control"
				name="priority"
				value={priority}
				onChange={(e) => handleChg(e)}
				placeholder="priority"
			/> */}
			<div className="form-control">
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="radio"
						name="priority"
						value="low"
						onClick={(e) => handleChg(e)}
					/>
					<label class="form-check-label">Low</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="radio"
						name="priority"
						value="medium"
						onClick={(e) => handleChg(e)}
					/>
					<label class="form-check-label">Medium</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="radio"
						name="priority"
						value="high"
						onClick={(e) => handleChg(e)}
					/>
					<label class="form-check-label">High</label>
				</div>
			</div>
			<button className="btn btn-success " onClick={() => handleClick()}>
				CREATE
			</button>
		</div>
	);
};
