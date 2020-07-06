import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { UsersStore } from 'stores';
import { Loader } from 'components/common';
import { UserUpdateHeader, UserUpdateForm } from './components';

const UpdateUser = observer(() => {
	const userId = useParams().userId;

	const { loading, user } = UsersStore;

	useEffect(() => {
		UsersStore.fetchUser(userId);
	}, [userId]);

	return (
		<div className='update-user'>
			<UserUpdateHeader />
			{loading && <Loader />}
			{!loading && user && <UserUpdateForm id={userId} />}
		</div>
	);
});

export default UpdateUser;
