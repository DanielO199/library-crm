import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	return (
		<aside>
			<ul className='nav-links'>
				<h1>Library</h1>
				<li>
					<NavLink to='/home'>
						<i className='fas fa-chart-line'></i>Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to='/home'>
						<i className='fas fa-chart-line'></i>Audit logs
					</NavLink>
				</li>
				<li>
					<NavLink to='/users'>
						<i className='far fa-user'></i>Users
					</NavLink>
				</li>
				<li>
					<NavLink to='/loans'>
						<i className='far fa-address-card'></i>Loans
					</NavLink>
				</li>
				<li>
					<NavLink to='/books'>
						<i className='fas fa-book'></i> Books
					</NavLink>
				</li>
			</ul>
			<div className='logout'>
				<i
					onClick={() => console.log('cks')}
					className='fas fa-2x fa-sign-out-alt'></i>
			</div>
		</aside>
	);
};

export default Sidebar;
