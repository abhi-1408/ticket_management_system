import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../Redux/store';
import {Dashboard} from '../Admin/Dashboard';
import {Login} from '../Auth/Login';
import {Signup} from '../Auth/Signup';
import {Logout} from '../Auth/Logout';
import {TicketView} from '../Common/TicketView';
import {Create} from '../Common/Create';

import {Users} from '../User/Users';
import {Charts} from '../Admin/Charts';

export const Routes = (props) => {
	const {logged_in, current_userid, isAdmin} = useSelector((state) => state);
	return (
		<>
			<br />
			{!logged_in ? (
				<>
					<nav class="navbar navbar-light bg-light">
						<a class="navbar-brand" href="/">
							HOME
						</a>

						<Link className="navbar-brand text-primary" to="/login">
							LOGIN
						</Link>
						<Link className="navbar-brand text-warning" to="/signup">
							SIGN UP
						</Link>
					</nav>
					<div class="container text-center">
						<div className="row">
							<div className="col">
								<h1>TICKET MANAGEMENT SYSTEM</h1>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<nav class="navbar navbar-light bg-light">
						<Link className="navbar-brand" to={`/user/${current_userid}`}>
							USER HOME
						</Link>
						{isAdmin == 1 ? (
							<Link className="navbar-brand text-info" to="/all_tickets">
								ALL TICKETS
							</Link>
						) : (
							''
						)}
						<Link className="navbar-brand text-danger" to="/logout">
							LOGOUT
						</Link>
					</nav>
				</>
			)}
			<br />

			<Switch>
				<Route path="/" exact render={(props) => <div></div>} />
				<Route path="/login" exact render={(props) => <Login />} />
				<Route path="/signup" exact render={(props) => <Signup {...props} />} />
				<Route path="/logout" exact render={(props) => <Logout {...props} />} />
				<Route path="/admin/dashboard" exact render={(props) => <Charts />} />
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
