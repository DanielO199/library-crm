import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { UsersStore } from 'stores';
import { Pagination, Loader } from 'components/common';
import {
	UsersListHeader,
	UsersListNone,
	UsersListToolBar,
	UsersListFilters,
	UsersListTable,
	UserItem
} from './components';

const UsersList = observer(() => {
	const {
		loading,
		usersList,
		usersQuantity,
		filters,
		isFirstPageNeeded
	} = UsersStore;

	useEffect(() => {
		UsersStore.fetchUsers();
		UsersStore.resetFilters();
	}, []);

	return (
		<>
			<div className='users-list'>
				<UsersListHeader />
				<UsersListToolBar />
				<UsersListFilters />
				{loading && <Loader />}
				{!loading && usersList && (
					<UsersListTable>
						{usersList.map((user) => (
							<UserItem
								key={user.id}
								id={user.id}
								image={user.image}
								name={user.name}
								surname={user.surname}
								email={user.email}
								status={user.status}
							/>
						))}
					</UsersListTable>
				)}
				{usersQuantity ? (
					<Pagination
						numberOfArticles={usersQuantity}
						params={filters}
						articlesPerPage={5}
						fetchArticles={(page, params) =>
							UsersStore.fetchUsers(page, params)
						}
						isFirstPageNeeded={isFirstPageNeeded}
					/>
				) : null}
				{usersQuantity === 0 && <UsersListNone />}
			</div>
		</>
	);
});

export default UsersList;
