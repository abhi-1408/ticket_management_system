import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTicket} from '../../Redux/action';
import {Link, Redirect} from 'react-router-dom';

export const Create = (props) => {
	const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');

	function handleChg(e) {
		if (e.target.name == 'subject') {
			setSubject(e.target.value);
		} else {
			setDescription(e.target.value);
		}
	}

	const dispatch = useDispatch();

	function handleClick() {
		dispatch(
			createTicket({
				user_id: props.match.params.id,
				data: {description: description, subject: subject},
			})
		);
		props.history.push(`/user/${props.match.params.id}`);
	}

	return (
		<div>
			CREATE NEW TICKET USER{props.match.params.id}
			<input
				name="subject"
				value={subject}
				onChange={(e) => handleChg(e)}
				placeholder="subject"
			/>
			<input
				name="description"
				value={description}
				onChange={(e) => handleChg(e)}
				placeholder="description"
			/>
			<button onClick={() => handleClick()}>CREATE</button>
		</div>
	);
};
