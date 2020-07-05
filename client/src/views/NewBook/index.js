import React from 'react';
import { observer } from 'mobx-react';

import { NewBookHeader, NewBookForm } from './components';

const NewBook = observer(() => {
	return (
		<div className='new-book'>
			<NewBookHeader />
			<NewBookForm />
		</div>
	);
});

export default NewBook;
