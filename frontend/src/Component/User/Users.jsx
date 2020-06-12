import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {loginUser} from '../../Redux/action';

export const Users = (props) => {
	const {logged_in} = useSelector((state) => state);

	if (logged_in) {
		return <h2>logged in user</h2>;
	} else {
		return <div>NOT LOGGED IN</div>;
	}
};
