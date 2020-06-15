import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNewCompany, fetchCompanyResetFlag} from '../../Redux/action';

export const CreateNewCompany = (props) => {
	let dispatch = useDispatch();

	const [name, setName] = useState('');
	const [flag, setFlag] = useState(false);

	function handleChg(e) {
		setName(e.target.value);
	}

	const {current_userid, company_add_flag} = useSelector((state) => state);

	function handleClick() {
		dispatch(createNewCompany({name: name}));
		setFlag(true);
		// props.history.push(`/user/${current_userid}`);
	}

	if (company_add_flag) {
		dispatch(fetchCompanyResetFlag(false));
		console.log('company flag', company_add_flag);
		props.history.push('/admin/dashboard');
	} else {
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
				{/* <div>{flag ? 'CREATED' : ''}</div> */}
				{flag ? <div className="text-success">SUCCESSFULLY CREATED </div> : ''}
				<button className="btn btn-success my-2" onClick={() => handleClick()}>
					CREATE COMPANY
				</button>
			</div>
		);
	}
};
