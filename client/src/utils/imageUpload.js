import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = (props) => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setISValid] = useState();

	const filePickerRef = useRef();

	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			fileIsValid = true;
		} else {
			setISValid(false);
			fileIsValid = false;
		}
		props.onInput(props.id, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className='form-input'>
			<input
				id={props.id}
				ref={filePickerRef}
				style={{ display: 'none' }}
				type='file'
				accept='.jpg, .png, .jpeg'
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className='image-upload__preview' onClick={pickImageHandler}>
					{(previewUrl || props.initialImage) && (
						<img
							src={previewUrl || `http://localhost:5000/${props.initialImage}`}
							alt='PREVIEW'
						/>
					)}
					{!previewUrl && !props.initialImage && (
						<p>
							<i className='fas fa-plus'></i> Image
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageUpload;
