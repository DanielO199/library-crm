import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { AuthStore } from 'stores';

export default function RerouteLogged(Children) {
	class RerouteLoggedComponent extends React.Component {
		render() {
			const { token } = AuthStore;
			return (
				<div>
					{token ? (
						<Redirect
							to={{
								pathname: '/home',
								state: { from: this.props.location }
							}}
						/>
					) : !token ? (
						<Children {...this.props} />
					) : null}
				</div>
			);
		}
	}
	return observer(RerouteLoggedComponent);
}
