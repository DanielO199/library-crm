import React from 'react';
import CountUp from 'react-countup';
import { Bar, Line, Pie } from 'react-chartjs-2';

const Card = ({ quantity, label }) => {
	return (
		<div className='card'>
			<i className='fas fa-2x fa-chart-line'></i>
			<div className='card-quantity'>
				<CountUp start={0} end={quantity} duration={4} separator=',' />
			</div>
			<div className='card-label'>{label}</div>
		</div>
	);
};

const Chart = ({ loans, legendPosition }) => {
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
		<div className='chart'>
			<Bar
				data={chartData}
				options={{
					legend: {
						position: legendPosition
					}
				}}
			/>

			{/* <Line
				data={chartData}
				options={{
					title: {
						display: displayTitle,
						text: 'Largest Cities In ' + location,
						fontSize: 25
					},
					legend: {
						display: displayLegend,
						position: legendPosition
					}
				}}
			/>

			<Pie
				data={chartData}
				options={{
					title: {
						display: displayTitle,
						text: 'Largest Cities In ' + location,
						fontSize: 25
					},
					legend: {
						display: displayLegend,
						position: legendPosition
					}
				}}
			/> */}
		</div>
	);
};

export { Card, Chart };
