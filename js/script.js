
import totalSumPage from './modules/totalSumPage.js';
import {initGoods} from './modules/initGoods.js';
import changePage from './modules/changePage.js';
import openAnImage from './modules/openImageProduct.js';
import deleteGood from './modules/deleteGood.js';
import editGood from './modules/editGood.js';
import openModal from './modules/openModal.js';
import {fetchRequest} from './modules/fetchRequest.js';
import renderGoods from './modules/createElements.js';
import elements from './modules/elementsPage.js';
import {showModal} from './modules/showModal.js';
import searchGoods from './modules/searchGoods.js';
import createOptionsFilter from './modules/createOptionsFilter.js';
import searchFilter from './modules/serachFilter.js';
const {
  totalPriceSpanPage,
  tableList,
  wrapperTable,
  numberPages,
  btnLeft,
  btnRight,
  cmsFilterBtn,
  cmsFilterPlaceholder,
  cmsFilterWrapper,
} = elements;


const init = async () => {
  await initGoods(fetchRequest, renderGoods, tableList,
      numberPages, `/api/goods`);
  await createOptionsFilter(cmsFilterBtn);
  changePage(fetchRequest, renderGoods,
      tableList, btnLeft, btnRight);
  totalSumPage(totalPriceSpanPage);
  // Вызов функции открытия изображения товара
  openAnImage(tableList);
  // Вызов функции удаления товара
  deleteGood(tableList, fetchRequest);
  editGood(tableList, fetchRequest, renderGoods,
      initGoods, numberPages, showModal);
  openModal(wrapperTable);
  searchGoods(tableList, numberPages);
  searchFilter(cmsFilterBtn, tableList, numberPages,
      cmsFilterPlaceholder, cmsFilterWrapper);
};

init();
