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

const Chart = ({
	chartData,
	displayTitle,
	location,
	displayLegend,
	legendPosition
}) => {
	return (
		<div className='chart'>
			<Bar
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

			<Line
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
			/>
		</div>
	);
};

export { Card, Chart };
