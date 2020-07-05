import React from 'react';
import { observer } from 'mobx-react';

import { NewUserHeader, NewUserForm } from './components';

const NewUser = observer(() => {
	return (
		<div className='new-user'>
			<NewUserHeader />
			<NewUserForm />
		</div>
	);
});

export default NewUser;
