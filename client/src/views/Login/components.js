import React from 'react';
import { observer } from 'mobx-react';

import { AuthStore } from 'stores';
import { Input, Button, LoadingSpinner } from 'components/common';
import { useForm, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from 'utils';

const LoginForm = observer(() => {
	const [formState, inputHandler] = useForm(
		{
			email: { value: '', isValid: false },
			password: { value: '', isValid: false }
		},
		false
	);

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
			<Button
				fullWidth
				onClick={
					formState.isValid
						? (e) => {
								e.preventDefault();
								AuthStore.login({
									email: formState.inputs.email.value,
									password: formState.inputs.password.value
								});
						  }
						: null
				}>
				{AuthStore.loading ? <LoadingSpinner /> : 'Sign in'}
			</Button>
		</form>
	);
});

export { LoginForm };
