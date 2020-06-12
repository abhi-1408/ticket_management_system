import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../Redux/action';
import {Redirect} from 'react-router-dom';

export const Login = (props) => {
	let dispatch = useDispatch();
	const {logged_in, wrong_cred, current_userid} = useSelector((state) => state);

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

	if (logged_in) {
		let url = '/user/' + current_userid;
		return <Redirect to={url} />;
	} else {
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
				<div>{wrong_cred ? 'wrong credentials' : ''}</div>
				<button onClick={() => handleSubmit()}>LOGIN</button>
			</div>
		);
	}
};
