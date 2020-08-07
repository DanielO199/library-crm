import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import { AuthStore } from 'stores';

const Sidebar = observer(() => {
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
					<NavLink to='/audit-logs'>
						<i className='fas fa-cog'></i>Audit logs
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
				<i onClick={AuthStore.logout} className='fas fa-2x fa-sign-out-alt'></i>
			</div>
		</aside>
	);
});

export default Sidebar;
