import elements from './modules/elementsPage.js';
// import {modalControl, addProductPage, totalSumPage,
//   activeCheckDiscount, calculatePrice,
//   formControl, deleteProduct, opensAnImage} from './modules/control.js';
import {totalSumPage} from './modules/control.js';
import {fetchRequest} from './modules/loadSendGoods.js';
import renderGoods from './modules/createElements.js';
import {showModal} from './modules/modal.js';

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

export const URL = 'https://mica-short-xenoposeidon.glitch.me/api/goods';


const init = async () => {
  await fetchRequest(URL, {callback: renderGoods});

  totalSumPage(totalPriceSpanPage, fetchRequest, URL);
  // await activeCheckDiscount(form, checkbox, checkboxInput);
  // await modalControl(overlayModal);
  // addProductPage(addProduct, overlayModal);
  // await calculatePrice(inputPrice, inputCount, totalPriceSpanForm);
  // formControl(form, totalPriceSpanPage,
  //     overlayModal, fetchRequest, URL, renderGoods, tableList,
  // );
  // deleteProduct(data, tableList, totalPriceSpanPage);
  // opensAnImage(tableList);
};

init();
