const URL = 'https://mica-short-xenoposeidon.glitch.me';
// Получение данных с сервера и отправка дананных на сервер
export const fetchRequest = async (
	postfix,
	{ method = 'GET', callback, body, headers }
) => {
	try {
		const options = {
			method
		};

		if (body) options.body = JSON.stringify(body);

		if (headers) options.headers = headers;

		const response = await fetch(`${URL}${postfix}`, options);

		if (response.ok) {
			const data = await response.json();

			if (callback) return callback(null, data);
			return;
		}
		throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
	} catch (err) {
		return callback(err);
	}
};
