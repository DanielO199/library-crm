import React from 'react';
import ReactDOM from 'react-dom';
import { BackDrop } from 'components/common';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = ({ onCancel, onSubmit, children, footer }) => {
	const content = (
		<div className='modal'>
			<header className='modal__header'>
				<div>Confirm</div>
				<i className='fas fa-times' onClick={onCancel}></i>
			</header>
			<form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
				<div className='modal__content '>{children}</div>
				<footer className='modal__footer'>{footer}</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <BackDrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames='modal'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
