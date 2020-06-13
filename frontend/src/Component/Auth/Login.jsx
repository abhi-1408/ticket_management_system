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
			<>
				<div className="text-center">
					<h2>LOGIN</h2>
				</div>
				<div className="form-group m-5">
					<label>USERNAME</label>
					<input
						className="form-control"
						name="username"
						value={username}
						onChange={(e) => handleChg(e)}
						placeholder="username"
					/>
					<label>PASSWORD</label>
					<input
						className="form-control"
						name="password"
						value={password}
						onChange={(e) => handleChg(e)}
						placeholder="password"
					/>
					<div>
						{wrong_cred ? (
							<div className="text-danger">wrong credentials</div>
						) : (
							''
						)}
					</div>
					<button
						className="btn btn-primary my-2"
						onClick={() => handleSubmit()}
					>
						LOGIN
					</button>
				</div>
			</>
		);
	}
};
