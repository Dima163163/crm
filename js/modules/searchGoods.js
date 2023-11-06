import {fetchRequest} from './fetchRequest.js';
import elements from './elementsPage.js';
import renderGoods from './createElements.js';
import {initGoods} from './initGoods.js';
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

    await initGoods(fetchRequest, renderGoods, tableList,
        numberPages, `/api/goods/?search=${value}`);
  };

  const debounceUpadate = debounce(renderSearchGoods, 300);
  inputSearch.addEventListener('input', debounceUpadate);
};

export default searchGoods;
