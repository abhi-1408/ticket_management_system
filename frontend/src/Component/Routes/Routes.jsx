import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../Redux/store';
import {Dashboard} from '../Admin/Dashboard';
import {Login} from '../Auth/Login';
import {Logout} from '../Auth/Logout';
import {TicketView} from '../Common/TicketView';
import {Create} from '../Common/Create';

import {Users} from '../User/Users';

export const Routes = (props) => {
	const {logged_in, current_userid, isAdmin} = useSelector((state) => state);
	return (
		<>
			<br />
			{!logged_in ? (
				<Link to="/login">LOGIN</Link>
			) : (
				<>
					<Link to="/logout">LOGOUT</Link>
					<Link to={`/user/${current_userid}`}>USER HOME</Link>
				</>
			)}
			<br />
			{isAdmin == 1 ? <Link to="/all_tickets">ALL TICKETS</Link> : ''}
			<Switch>
				<Route path="/login" exact render={(props) => <Login />} />
				<Route path="/logout" exact render={(props) => <Logout {...props} />} />
				<Route
					path="/create/:id"
					exact
					render={(props) => <Create {...props} />}
				/>
				<Route path="/all_tickets" exact render={(props) => <Dashboard />} />
				<Route
					path="/user/:id"
					exact
					render={(props) => <Users {...props} />}
				/>
				<Route
					path="/target/:id"
					exact
					render={(props) => <TicketView {...props} />}
				/>
				<Route render={() => <h2>NOT FOUND</h2>} />
			</Switch>
		</>
	);
};
