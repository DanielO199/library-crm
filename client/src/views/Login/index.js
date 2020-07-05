import React from 'react';

import { LoginForm } from './components';

const Login = () => {
	return (
		<div className='login'>
			<div className='login-background'></div>
			<div className='form-container'>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
