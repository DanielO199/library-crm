import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { UsersStore } from 'stores';
import { Loader } from 'components/common';
import { UserHeader, UserToolBar, UserData } from './components';

const User = observer(() => {
	const userId = useParams().userId;
	const { loading, user } = UsersStore;

	useEffect(() => {
		UsersStore.fetchUser(userId);
	}, [userId]);

	return (
		<div className='user'>
			<UserHeader />
			<UserToolBar userId={userId} />
			{loading && <Loader />}
			{!loading && user && <UserData />}
		</div>
	);
});

export default User;
