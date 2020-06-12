import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../Redux/store';
import {Dashboard} from '../Admin/Dashboard';
import {Login} from '../Auth/Login';

export const Routes = (props) => {
	return (
		<>
			<br />
			<Link to="/login">LOGIN</Link>
			<br />
			<Link to="/all_tickets">ALL TICKETS</Link>

			<Switch>
				<Route path="/login" exact render={(props) => <Login />} />
				<Route path="/all_tickets" exact render={(props) => <Dashboard />} />
				<Route render={() => <h2>NOT FOUND</h2>} />
			</Switch>
		</>
	);
};
