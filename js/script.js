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

// const data = [
//   {
//     'id': 246016548,
//     'title': 'Навигационная система Soundmax',
//     'description': 'Техника для дома',
//     'price': 100,
//     'units': 'шт',
//     'discont': 5,
//     'count': 5,
//     'image': 'https://www.hausdorf.ru/upload/iblock/10c/professionalnaya-kofemashina-wmf-900-s.jpg',
//   },
//   {
//     'id': 937295527,
//     'title': 'Настольная игра “На 4-х ногах”',
//     'description': 'Настольные игры',
//     'price': 1,
//     'discont': 15,
//     'units': 'шт',
//     'count': 12,
//     'image': 'https://www.hausdorf.ru/upload/iblock/10c/professionalnaya-kofemashina-wmf-900-s.jpg',
//   },
// ];


const init = () => {
  fetchRequest(URL, {callback: renderGoods});
  // renderGoods(data, tableList);
  activeCheckDiscount(form, checkbox, checkboxInput);
  modalControl(overlayModal);
  addProductPage(addProduct, overlayModal);
  // deleteProduct(data, tableList, totalPriceSpanPage);
  // calculatePrice(inputPrice, inputCount, totalPriceSpanForm);
  formControl(form, totalPriceSpanPage, overlayModal,
      fetchRequest, URL, renderGoods);
  // formControl(data, form, totalPriceSpanPage, overlayModal, tableList,
  //     sendGoods);
  // totalSumPage(data, totalPriceSpanPage);
  // opensAnImage(tableList);
};

init();
