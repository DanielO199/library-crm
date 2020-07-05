import React, { useState } from 'react';

import { Input, Button, LoadingSpinner } from 'components/common';
import { useForm } from 'utils';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from 'utils/validators';

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [formState, inputHandler] = useForm(
		{
			email: { value: '', isValid: false },
			password: { value: '', isValid: false }
		},
		false
	);

	const setXD = (e) => {
		e.preventDefault();
		setIsLoading(!isLoading);
	};

	return (
		<form>
			<div className='login-form__inputs'>
				<div className='login-form__title '>Library</div>
				<Input
					id='email'
					element='input'
					type='text'
					label='Email'
					required={true}
					validators={[VALIDATOR_EMAIL()]}
					errorText='Email is required'
					onInput={inputHandler}
					valid={true}
				/>
				<Input
					id='password'
					element='input'
					type='password'
					label='Password'
					required={true}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Password is required'
					onInput={inputHandler}
					valid={true}
				/>
			</div>
			<Button fullWidth onClick={formState.isValid ? setXD : null}>
				{isLoading ? <LoadingSpinner /> : 'Sign in'}
			</Button>
		</form>
	);
};

export { LoginForm };
