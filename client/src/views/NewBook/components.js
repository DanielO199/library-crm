import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { BooksStore } from 'stores';
import { Input, Button, LoadingSpinner } from 'components/common';
import { VALIDATOR_REQUIRE } from 'utils/validators';
import { useForm, ImageUpload } from 'utils';

const NewBookHeader = () => {
	return <h1 className='new-book__header'>New Book</h1>;
};

const NewBookForm = observer(() => {
	const history = useHistory();

	const [formState, inputHandler] = useForm(
		{
			isbn: { value: '', isValid: false },
			title: { value: '', isValid: false },
			author: { value: '', isValid: false },
			image: { value: null, isValid: false }
		},
		false
	);

	return (
		<div className='new-book-form'>
			<Input
				id='isbn'
				element='input'
				type='text'
				label='ISBN'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='ISBN is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<Input
				id='author'
				element='input'
				type='text'
				label='Author'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Author is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<Input
				id='title'
				element='input'
				type='text'
				label='Title'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Title is required'
				onInput={inputHandler}
				required={true}
				valid={true}
			/>
			<ImageUpload
				id='image'
				onInput={inputHandler}
				errorText='Please provide an image'
			/>
			<div className='new-book-form__btns'>
				<div className='new-book-form__btn '>
					<Button
						onClick={
							formState.isValid
								? async () => {
										const formData = new FormData();
										formData.append('isbn', formState.inputs.isbn.value);
										formData.append('title', formState.inputs.title.value);
										formData.append('author', formState.inputs.author.value);
										formData.append('image', formState.inputs.image.value);
										await BooksStore.addBook(formData);
										history.push('/books');
								  }
								: null
						}>
						{BooksStore.loading ? <LoadingSpinner /> : 'Save'}
					</Button>
				</div>
				<Button inverse>Reset</Button>
			</div>
		</div>
	);
});

export { NewBookHeader, NewBookForm };
