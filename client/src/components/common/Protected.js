import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { AuthStore } from 'stores';

export default function Protected(Children) {
	class AuthenticatedComponent extends React.Component {
		render() {
			const { token } = AuthStore;
			return (
				<div>
					{token ? (
						<Children {...this.props} />
					) : !token ? (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: this.props.location }
							}}
						/>
					) : null}
				</div>
			);
		}
	}
	return observer(AuthenticatedComponent);
}
