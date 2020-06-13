import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTicket} from '../../Redux/action';
import {Link, Redirect} from 'react-router-dom';

export const Create = (props) => {
	const {current_userid} = useSelector((state) => state);

	const [subject, setSubject] = useState('');
	const [resolved, setResolved] = useState('');
	const [priority, setPriority] = useState('');
	const [description, setDescription] = useState('');

	function handleChg(e) {
		if (e.target.name == 'subject') {
			setSubject(e.target.value);
		} else if (e.target.name == 'description') {
			setDescription(e.target.value);
		} else if (e.target.name == 'resolved') {
			setResolved(e.target.value);
		} else if (e.target.name == 'priority') {
			setPriority(e.target.value);
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
			<label>Description</label>
			<input
				className="form-control"
				name="description"
				value={description}
				onChange={(e) => handleChg(e)}
				placeholder="description"
			/>
			<label>Resolved</label>
			<input
				className="form-control"
				name="resolved"
				value={resolved}
				onChange={(e) => handleChg(e)}
				placeholder="resolved 0/1"
			/>
			<label>Priority</label>
			<input
				className="form-control"
				name="priority"
				value={priority}
				onChange={(e) => handleChg(e)}
				placeholder="priority"
			/>
			<button className="btn btn-success " onClick={() => handleClick()}>
				CREATE
			</button>
		</div>
	);
};
