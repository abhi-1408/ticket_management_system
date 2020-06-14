import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser, registerReset} from '../../Redux/action';
import {Redirect} from 'react-router-dom';

export const Signup = (props) => {
	let dispatch = useDispatch();
	const {logged_in, wrong_cred, current_userid, register_success} = useSelector(
		(state) => state
	);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [isAdmin, setAdmin] = useState('0');
	const [phone, setPhone] = useState('');

	function handleChg(e) {
		if (e.target.name == 'email') {
			setEmail(e.target.value);
		} else if (e.target.name == 'password') {
			setPassword(e.target.value);
		} else if (e.target.name == 'name') {
			setName(e.target.value);
		} else if (e.target.name == 'isAdmin') {
			setAdmin(e.target.value);
		} else if (e.target.name == 'phone') {
			setPhone(e.target.value);
		}
	}

	function handleSubmit() {
		dispatch(
			registerUser({
				name: name,
				isAdmin: isAdmin,
				phone: phone,
				email: email,
				password: password,
			})
		);

		//this is for as if the status changes it should redirect back to login page
		setTimeout(() => {
			dispatch(registerReset());
			props.history.push('/login');
		}, 2000);
		// props.history.push('/login');
	}

	return (
		<>
			<div className="text-center">
				<h2>REGISTER PAGE</h2>
			</div>
			<div className="form-group m-5">
				<label>Name</label>
				<input
					className="form-control"
					name="name"
					value={name}
					onChange={(e) => handleChg(e)}
					placeholder="name"
				/>
				<label>Type</label>
				{/* <input
					className="form-control"
					name="isAdmin"
					value={isAdmin}
					onChange={(e) => handleChg(e)}
					placeholder="admin 0/1"
				/> */}
				<div className="form-control">
					<div class="form-check form-check-inline">
						<input
							class="form-check-input"
							type="radio"
							name="isAdmin"
							value="0"
							onClick={(e) => handleChg(e)}
						/>
						<label class="form-check-label">Normal User</label>
					</div>
					<div class="form-check form-check-inline">
						<input
							class="form-check-input"
							type="radio"
							name="isAdmin"
							value="1"
							onClick={(e) => handleChg(e)}
						/>
						<label class="form-check-label">Admin</label>
					</div>
				</div>
				<label>Phone</label>
				<input
					className="form-control"
					name="phone"
					value={phone}
					onChange={(e) => handleChg(e)}
					placeholder="phone"
				/>

				<label>email</label>
				<input
					className="form-control"
					name="email"
					value={email}
					onChange={(e) => handleChg(e)}
					placeholder="email"
				/>
				<label>password</label>
				<input
					className="form-control"
					name="password"
					value={password}
					onChange={(e) => handleChg(e)}
					placeholder="password"
				/>
				<div>
					{register_success == 1 ? (
						<div className="text-secondary">PROCESSING.. </div>
					) : (
						''
					)}
					{register_success == 2 ? (
						<div className="text-success">SUCCESSFULLY REGISTERED </div>
					) : (
						''
					)}
					{register_success == -1 ? (
						<div className="text-danger">ERROR OCCURED </div>
					) : (
						''
					)}
				</div>
				<button className="btn btn-primary my-2" onClick={() => handleSubmit()}>
					REGISTER
				</button>
			</div>
		</>
	);
};
