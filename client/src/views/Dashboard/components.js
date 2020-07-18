import React from 'react';
import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';

const DashboardHeader = () => {
	return <h1 className='dashboard-header'>Dashboard</h1>;
};

const Card = ({ quantity, label }) => {
	return (
		<div className='card'>
			<i className='fas fa-2x fa-chart-line'></i>
			<div className='card-quantity'>
				<CountUp start={0} end={quantity} duration={2} separator=',' />
			</div>
			<div className='card-label'>{label}</div>
		</div>
	);
};

const Chart = ({ loans }) => {
	const chartData = {
		labels: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		datasets: [
			{
				label: 'Loans',
				data: loans,
				backgroundColor: 'rgba(237, 68, 161)'
			}
		]
	};

	const options = {
		animation: {
			duration: 1500,
			easing: 'easeInQuint'
		},
		responsive: true,
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}
		},
		legend: {
			display: false
		},
		title: {
			display: true,
			text: 'Loans'
		},
		elements: {
			line: {
				// backgroundColor: 'rgba(3, 254, 0)',
				borderColor: 'rgba(243, 130, 192)',
				fill: false
			}
		},
		scales: {
			yAxes: [
				{
					gridLines: {
						display: false
					}
				}
			],
			xAxes: [
				{
					gridLines: {
						display: false
					}
				}
			]
		}
	};

	return (
		<div className='chart'>
			<Line data={chartData} options={options} />
		</div>
	);
};

const UsersList = ({ users }) => {
	return (
		<div className='dashboard-best-list'>
			<h2>Most active users</h2>
			{users.map((user) => (
				<div key={user._id} className='dashboard-best__item'>
					<div>
						{user.name} {user.surname}
					</div>
					<div>{user.borrowedBooksQuantity}</div>
				</div>
			))}
		</div>
	);
};

const BooksList = ({ books }) => {
	return (
		<div className='dashboard-best-list'>
			<h2>Best books</h2>
			{books.map((book) => (
				<div key={book._id} className='dashboard-best__item'>
					<div>{book.title}</div>
					<div>{book.loansQuantity}</div>
				</div>
			))}
		</div>
	);
};

export { DashboardHeader, Card, Chart, UsersList, BooksList };
