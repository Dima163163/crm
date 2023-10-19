import elements from './modules/elementsPage.js';
import {modalControl, addProductPage, totalSumPage,
  activeCheckDiscount, calculatePrice,
  formControl, deleteProduct, opensAnImage} from './modules/control.js';
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
  totalSumPage(totalPriceSpanPage, fetchRequest, URL);
  activeCheckDiscount(form, checkbox, checkboxInput);
  modalControl(overlayModal);
  addProductPage(addProduct, overlayModal);
  calculatePrice(inputPrice, inputCount, totalPriceSpanForm);
  formControl(form, totalPriceSpanPage,
      overlayModal, fetchRequest, URL, renderGoods, tableList,
  );
  // deleteProduct(data, tableList, totalPriceSpanPage);
  // opensAnImage(tableList);
};

init();
