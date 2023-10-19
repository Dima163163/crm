// Получение данных с сервера и отправка дананных на сервер
export const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      const dataGoods = data.goods;
      if (callback) callback(null, dataGoods);
      return;
    }
    console.log(response.status);
    throw new Error(response.status);
  } catch (err) {
    callback(err);
  }
};
