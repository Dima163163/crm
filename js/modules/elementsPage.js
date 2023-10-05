const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const title = document.querySelector('.modal__title');
const closeBtn = document.querySelector('.modal-close');
const id = document.querySelector('.modal__id');
const idNumber = document.querySelector('.modal__id-number');
const form = document.querySelector('.form');
const checkbox = document.querySelector('.crm__checkbox-input');
const checkboxLabel = document.querySelector('.crm__checkbox');
const checkboxInput = document.querySelector('.crm__discont-input');
const inputPrice = document.querySelector('.crm__price-input');
const inputCount = document.querySelector('.crm__count-input');
const totalTitle = document.querySelector('.total-cost');
const totalPriceSpanForm = document.querySelector('.total-cost-form__span');
const totalPriceSpanPage = document.querySelector('.total-cost__span');
const addProduct = document.querySelector('.cms-btn');
const overlayModal = document.querySelector('.overlay');
const tableList = document.querySelector('.table-list');
const allInputSum = document.querySelectorAll('.crm__sum-input');


export default {
  body,
  modal,
  title,
  closeBtn,
  id,
  idNumber,
  form,
  checkbox,
  checkboxLabel,
  checkboxInput,
  inputPrice,
  inputCount,
  totalTitle,
  totalPriceSpanForm,
  totalPriceSpanPage,
  addProduct,
  overlayModal,
  tableList,
  allInputSum,
};
