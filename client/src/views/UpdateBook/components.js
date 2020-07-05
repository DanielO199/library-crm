import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { BooksStore } from 'stores';
import { Input, Button, LoadingSpinner } from 'components/common';
import { VALIDATOR_REQUIRE } from 'utils/validators';
import { useForm, ImageUpload } from 'utils';

const BookUpdateHeader = () => {
	return <h1 className='update-book__header'>Edit Book</h1>;
};

const BookUpdateForm = observer(({ id }) => {
	const history = useHistory();
	const { isbn, author, title, image } = BooksStore.book;

	const [formState, inputHandler] = useForm(
		{
			isbn: { value: '', isValid: true },
			title: { value: '', isValid: true },
			author: { value: '', isValid: true },
			image: { value: null, isValid: true }
		},
		false
	);

	return (
		<div className='update-book__form'>
			<Input
				id='isbn'
				element='input'
				type='text'
				label='ISBN'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='ISBN is required'
				onInput={inputHandler}
				initialValue={isbn}
				required={true}
				initialValid={true}
			/>
			<Input
				id='author'
				element='input'
				type='text'
				label='Author'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Author is required'
				onInput={inputHandler}
				initialValue={author}
				required={true}
				initialValid={true}
			/>
			<Input
				id='title'
				element='input'
				type='text'
				label='Title'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Title is required'
				onInput={inputHandler}
				initialValue={title}
				required={true}
				initialValid={true}
			/>
			<ImageUpload id='image' onInput={inputHandler} initialImage={image} />
			<div className='update-book-form__btns'>
				<div className='update-book-form__btn '>
					<Button
						onClick={
							formState.isValid
								? async () => {
										const formData = new FormData();
										formData.append('isbn', formState.inputs.isbn.value);
										formData.append('title', formState.inputs.title.value);
										formData.append('author', formState.inputs.author.value);
										formData.append('image', formState.inputs.image.value);

										await BooksStore.updateBook(formData, id);
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

export { BookUpdateHeader, BookUpdateForm };
