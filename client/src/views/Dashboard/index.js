import React, { useEffect } from 'react';

import { Card, Chart } from './components';

const Dashboard = () => {
	useEffect(() => {}, []);

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
				data: [12, 12, 9, 43, 25, 23],
				backgroundColor: [
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 64, 0.6)',
					'rgba(255, 99, 132, 0.6)'
				]
			}
		]
	};

	return (
		<div className='dashboard'>
			<div className='dashboard-cards'>
				<Card quantity={2} label='Users' />
				<Card quantity={10} label='Books' />
				<Card quantity={120} label='Loans' />
			</div>
			<div className='dasboard-charts'>
				TOP 5 CZYTELNIKOW TOP 5 NAJLEPSZYCH KSIAZEK MOZE
				<Chart
					chartData={chartData}
					location='Massachusetts'
					legendPosition='bottom'
				/>
			</div>
		</div>
	);
};

export default Dashboard;
