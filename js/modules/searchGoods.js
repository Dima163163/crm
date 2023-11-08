import {fetchRequest} from './fetchRequest.js';
import elements from './elementsPage.js';
import renderGoods from './createElements.js';
import {initGoods} from './initGoods.js';
import debounce from './debounce.js';
const {inputSearch} = elements;

const searchGoods = (tableList, numberPages) => {
  const renderSearchGoods = async () => {
    const value = inputSearch.value;

    await initGoods(fetchRequest, renderGoods, tableList,
        numberPages, `/api/goods/?search=${value}`);
  };

  const debounceUpadate = debounce(renderSearchGoods, 300);
  inputSearch.addEventListener('input', debounceUpadate);
};

export default searchGoods;
