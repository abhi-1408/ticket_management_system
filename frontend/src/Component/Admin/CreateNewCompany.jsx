import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNewCompany} from '../../Redux/action';

export const CreateNewCompany = (props) => {
	let dispatch = useDispatch();

	const [name, setName] = useState('');

	function handleChg(e) {
		setName(e.target.value);
	}

	function handleClick() {
		dispatch(createNewCompany({name: name}));
		props.history.push(`/user/${props.match.params.id}`);
	}

	return (
		<div className="container my-2 mx-5 p-5" style={{width: '600px'}}>
			<h3>CREATE NEW COMPANY</h3>
			<label>Name of Company</label>
			<input
				className="form-control my-2"
				name="name"
				value={name}
				onChange={(e) => handleChg(e)}
				placeholder="name"
			/>
			<button className="btn btn-success my-2" onClick={() => handleClick()}>
				CREATE COMPANY
			</button>
		</div>
	);
};
