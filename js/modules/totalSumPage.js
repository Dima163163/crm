import {fetchRequest} from './fetchRequest.js';


// Подсчет общей стоимости товаров
const totalSumPage = async (totalPriceSelector) => {
  const totalPrice = await fetchRequest('/api/total', {
    callback: (err, data) => data,
  });

  totalPriceSelector.textContent = `$${totalPrice}`;
};

export default totalSumPage;
