import {fetchRequest} from './fetchRequest.js';
import elements from './elementsPage.js';
import renderGoods from './createElements.js';
const {inputSearch} = elements;

const searchGoods = (tableList, numberPages) => {
  const debounce = (func, timeoutMS) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), timeoutMS);
    };
  };

  const renderSearchGoods = async () => {
    const value = inputSearch.value;
    console.log('value: ', value);

    const {err, data} = await fetchRequest(`/api/goods/?search=${value}`, {
      callback: (err, data) => ({
        err,
        data,
      }),
    });

    const goods = renderGoods(err, data);
    tableList.append(goods);
    console.log('goods: ', goods);
    numberPages.textContent =
    `${data.page === 1 ? `1-${data.goods.length} of ${data.totalCount}` :
    `${(data.page - 1) * 10} - ${data.totalCount} of ${data.totalCount}`}`;
  };

  const debounceUpadate = debounce(renderSearchGoods, 2200);
  inputSearch.addEventListener('input', debounceUpadate);
};

export default searchGoods;
