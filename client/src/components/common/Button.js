import React from 'react';

const Button = ({
	inverse,
	danger,
	fullWidth,
	onClick,
	disabled,
	children
}) => {
	return (
		<button
			className={`button ${inverse && 'button--inverse'} ${
				danger && 'button--danger'
			} ${fullWidth && 'w-100'}`}
			onClick={onClick}
			disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
