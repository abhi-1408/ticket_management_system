import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../Redux/action';
import {Redirect} from 'react-router-dom';

export const Logout = (props) => {
	let dispatch = useDispatch();
	const {logged_in} = useSelector((state) => state);

	function handleClick() {
		dispatch(logoutUser());
		props.history.push('/login');
	}

	return (
		<div>
			<button onClick={() => handleClick()}>LOGOUT</button>
		</div>
	);
};
