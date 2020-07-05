import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { UsersStore } from 'stores';
import { Input, Button, LoadingSpinner } from 'components/common';
import {
	useForm,
	ImageUpload,
	VALIDATOR_REQUIRE,
	VALIDATOR_EMAIL
} from 'utils';

const NewUserHeader = () => {
	return <h1 className='new-book__header'>New User</h1>;
};

const NewUserForm = observer(() => {
	const history = useHistory();

	const [formState, inputHandler] = useForm(
		{
			name: { value: '', isValid: false },
			surname: { value: '', isValid: false },
			phone: { value: '', isValid: false },
			email: { value: '', isValid: false },
			image: { value: null, isValid: false }
		},
		false
	);

	return (
		<div className='new-user-form'>
			<Input
				id='name'
				element='input'
				type='text'
				label='Name'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Name is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<Input
				id='surname'
				element='input'
				type='text'
				label='Surname'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Surname is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<Input
				id='email'
				element='input'
				type='text'
				label='E-mail'
				validators={[VALIDATOR_EMAIL()]}
				errorText='E-mail is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<Input
				id='phone'
				element='input'
				type='text'
				label='Phone'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Phone is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<ImageUpload id='image' onInput={inputHandler} />
			<div className='new-user-form__btns'>
				<div className='new-user-form__btn '>
					<Button
						onClick={
							formState.isValid
								? async () => {
										const formData = new FormData();
										formData.append('name', formState.inputs.name.value);
										formData.append('surname', formState.inputs.surname.value);
										formData.append('phone', formState.inputs.phone.value);
										formData.append('email', formState.inputs.email.value);
										formData.append('image', formState.inputs.image.value);
										await UsersStore.addUser(formData);
										history.push('/users');
								  }
								: null
						}>
						{UsersStore.loading ? <LoadingSpinner /> : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	);
});

export { NewUserHeader, NewUserForm };
