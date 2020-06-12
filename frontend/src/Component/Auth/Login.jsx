import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../Redux/action';

export const Login = (props) => {
	let dispatch = useDispatch();

	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');

	function handleChg(e) {
		if (e.target.name == 'username') {
			setUserName(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	}

	function handleSubmit() {
		dispatch(loginUser({username: username, password: password}));
	}

	return (
		<div>
			Login
			<input
				name="username"
				value={username}
				onChange={(e) => handleChg(e)}
				placeholder="username"
			/>
			<input
				name="password"
				value={password}
				onChange={(e) => handleChg(e)}
				placeholder="password"
			/>
			<button onClick={() => handleSubmit()}>LOGIN</button>
		</div>
	);
};
