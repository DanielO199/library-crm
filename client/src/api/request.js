import axios from 'axios';
import querystring from 'query-string';
import { config } from 'globals/config';
import { LoggerStore } from 'stores';

const DEBUG = true;

const instance = axios.create({
	baseURL: config.apiUrl,
	timeout: 30000,
	headers: {
		Accept: 'application/ld+json',
		'Content-Type': 'application/json'
	}
});

instance.defaults.headers.put['Content-Type'] = 'application/ld+json';
instance.defaults.headers.post['Content-Type'] = 'application/ld+json';

const logger = (data, url) => {
	DEBUG &&
		console.log(
			url,
			`\n\t status: ${data.status}`,
			`\n\t payload: `,
			data.data
		);
	if (Array.isArray(data.data)) {
		return { data: data.data, status: 201 };
	}
	return { ...data.data, statusCode: data.status };
};

const errorLogger = (error, url = '') => {
	DEBUG &&
		console.log(url, `\n\t status: ${error}`, `\n\t payload: `, error.data);
	return error.response;
};

export const request = (_url, _config = {}) => {
	DEBUG && console.log(_url, 'config', _config);
	const req = {
		url: _url,
		..._config
	};

	if (!req.headers) {
		req.headers = {};
	}
	if (_config.multipart) {
		req.headers['content-type'] = 'multipart/form-data';
	}

	if (_config.query && Object.keys(_config.query).length !== 0) {
		var _query = {};
		for (const param in _config.query) {
			if (['', null, undefined].indexOf(_config.query[param])) {
				_query[param] = _config.query[param];
			}
		}
		req.url += '&' + querystring.stringify(_query, { arrayFormat: 'bracket' });
	}
	return instance
		.request(req)
		.then((data) => {
			if (data.data.message) LoggerStore.successLog(data.data.message);
			return logger(data, _url);
		})
		.catch((error) => {
			if (error) LoggerStore.errorLog(error);
			throw errorLogger(error, _url);
		});
};
