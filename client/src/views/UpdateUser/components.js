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

const UserUpdateHeader = () => {
	return <h1 className='update-user__header'>Edit User</h1>;
};

const UserUpdateForm = observer(({ id }) => {
	const history = useHistory();
	const { name, surname, phone, email, image } = UsersStore.user;

	const [formState, inputHandler] = useForm(
		{
			name: { value: '', isValid: true },
			surname: { value: '', isValid: true },
			phone: { value: '', isValid: true },
			email: { value: '', isValid: true },
			image: { value: null, isValid: true }
		},
		false
	);

	return (
		<div className='update-user__form'>
			<Input
				id='name'
				element='input'
				type='text'
				label='Name'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Name is required'
				onInput={inputHandler}
				initialValue={name}
				required={true}
				initialValid={true}
			/>
			<Input
				id='surname'
				element='input'
				type='text'
				label='Surname'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Surname is required'
				onInput={inputHandler}
				initialValue={surname}
				required={true}
				initialValid={true}
			/>
			<Input
				id='phone'
				element='input'
				type='text'
				label='Phone'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Phone is required'
				onInput={inputHandler}
				initialValue={phone}
				required={true}
				initialValid={true}
			/>
			<Input
				id='email'
				element='input'
				type='text'
				label='E-mail'
				validators={[VALIDATOR_EMAIL()]}
				errorText='E-mail is required'
				onInput={inputHandler}
				initialValue={email}
				required={true}
				initialValid={true}
			/>
			<ImageUpload id='image' onInput={inputHandler} initialImage={image} />
			<div className='update-user-form__btn'>
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

									await UsersStore.updateUser(formData, id);
									history.push('/users');
							  }
							: null
					}>
					{UsersStore.loading ? <LoadingSpinner /> : 'Save'}
				</Button>
			</div>
		</div>
	);
});

export { UserUpdateHeader, UserUpdateForm };
