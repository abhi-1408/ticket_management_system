import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadChartsData} from '../../Redux/action';
import {Line, Pie, Bar} from 'react-chartjs-2';

export const Charts = (props) => {
	const {
		ticket_respective_company,
		ticket_by_date,
		tickets_status,
	} = useSelector((state) => state);

	let dispatch = useDispatch();

	function handleClick() {
		dispatch(loadChartsData());
	}

	useEffect(() => {
		dispatch(loadChartsData());
	}, []);

	return (
		<div>
			<nav class="navbar navbar-light bg-light ">CHARTS</nav>
			{/* <button onClick={() => handleClick()}>FETCH</button> */}
			<div className="container">
				<div className="row text-center">
					<div className="col">
						<div
							style={{
								position: 'relative',
								align: 'right',
								width: 600,
								height: 400,
								margin: '0px',
							}}
						>
							{/* <h3>chart sample</h3> */}
							<Line
								options={{
									responsive: true,
								}}
								data={{
									labels: ticket_by_date[1],
									datasets: [
										{
											label: 'No. of tickets on a particular day',
											backgroundColor: [
												'rgba(173, 246, 168, 1)',
												'rgba(255, 180, 158, 1)',
											],
											data: ticket_by_date[0],
										},
									],
								}}
							/>
						</div>
					</div>
					<div className="col my-5 py-4">
						<h4>
							Total Tickets : {tickets_status[0] && tickets_status[0].length}
						</h4>
						<h4>
							Total Tickets Today :
							{ticket_by_date[1] &&
								ticket_by_date[0][ticket_by_date[0].length - 1]}
						</h4>
						<h4>
							Total Companies :
							{ticket_respective_company[1] &&
								ticket_respective_company[1].length}
						</h4>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div style={{position: 'relative', width: 600, height: 500}}>
							{/* <h3>chart sample</h3> */}
							<Bar
								options={{
									responsive: true,
								}}
								data={{
									labels: ticket_respective_company[1],
									datasets: [
										{
											label: 'No. of tickets of a particular company',
											backgroundColor: [
												'rgba(173, 246, 168, 1)',
												'rgba(255, 180, 158, 1)',
											],
											data: ticket_respective_company[0],
										},
									],
								}}
							/>
						</div>
					</div>
					<div className="col">
						<div style={{position: 'relative', width: 600, height: 500}}>
							{/* <h3>datas</h3> */}
							<Pie
								options={{
									responsive: true,
								}}
								data={{
									labels: ['resolved', 'open'],
									datasets: [
										{
											label: 'tickets resolved/open',
											backgroundColor: [
												'rgba(173, 246, 168, 1)',
												'rgba(255, 180, 158, 1)',
											],
											data: tickets_status[0],
										},
									],
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
