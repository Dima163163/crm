import elements from './modules/elementsPage.js';
import {modalControl, addProductPage, totalSumPage,
  activeCheckDiscount, calculatePrice,
  formControl, deleteProduct, opensAnImage} from './modules/control.js';
// import renderGoods from './modules/render.js';
import {fetchRequest} from './modules/loadSendGoods.js';
import renderGoods from './modules/createElements.js';

const {
  form,
  checkbox,
  checkboxInput,
  inputPrice,
  inputCount,
  totalPriceSpanForm,
  totalPriceSpanPage,
  addProduct,
  overlayModal,
  tableList,
} = elements;

const URL = 'https://mica-short-xenoposeidon.glitch.me/api/goods';


const init = () => {
  fetchRequest(URL, {callback: renderGoods});
  // renderGoods(data, tableList);
  activeCheckDiscount(form, checkbox, checkboxInput);
  modalControl(overlayModal);
  addProductPage(addProduct, overlayModal);
  // deleteProduct(data, tableList, totalPriceSpanPage);
  // calculatePrice(inputPrice, inputCount, totalPriceSpanForm);
  formControl(form, totalPriceSpanPage, overlayModal,
      fetchRequest, URL, renderGoods, tableList);
  // formControl(data, form, totalPriceSpanPage, overlayModal, tableList,
  //     sendGoods);
  // totalSumPage(data, totalPriceSpanPage);
  // opensAnImage(tableList);
};

init();
