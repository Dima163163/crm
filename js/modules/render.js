import createRow from './createElements.js';

// Функция перебора массива с объектами для создания строк
const renderGoods = (arr, list) => {
  const arrGoods = arr.map(item => createRow(item, list));

  return arrGoods;
};

export default renderGoods;
