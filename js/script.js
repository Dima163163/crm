import elements from './modules/elementsPage.js';
import {modalControl, addProductPage, totalSumPage,
  activeCheckDiscount, calculatePrice,
  formControl, deleteProduct} from './modules/control.js';
import renderGoods from './modules/render.js';

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
  tableList} = elements;

const data = [
  {
    'id': 246016548,
    'title': 'Навигационная система Soundmax',
    'description': 'Техника для дома',
    'price': 100,
    'units': 'шт',
    'discont': 5,
    'count': 5,
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 937295527,
    'title': 'Настольная игра “На 4-х ногах”',
    'description': 'Настольные игры',
    'price': 1,
    'discont': 15,
    'units': 'шт',
    'count': 12,
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
];


const init = () => {
  renderGoods(data, tableList);
  activeCheckDiscount(form, checkbox, checkboxInput);
  modalControl(overlayModal);
  addProductPage(addProduct, overlayModal);
  deleteProduct(data, tableList, totalPriceSpanPage);
  calculatePrice(inputPrice, inputCount, totalPriceSpanForm);
  formControl(data, form, totalPriceSpanPage, overlayModal, tableList);
  totalSumPage(data, totalPriceSpanPage);
};

init();
