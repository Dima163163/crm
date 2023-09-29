'use strict';

const modal = document.querySelector('.modal');
const title = document.querySelector('.modal__title');
const closeBtn = document.querySelector('.modal-close');
const id = document.querySelector('.modal__id');
const idNumber = document.querySelector('.modal__id-number');
const form = document.querySelector('.form');
const checkbox = document.querySelector('.crm__checkbox');
const checkboxInput = document.querySelector('.crm__discont-input');
const totalTitle = document.querySelector('.total-cost');
const totalPrice = document.querySelector('.total-cost__span');
const addProduct = document.querySelector('.cms-btn');
const overlayModal = document.querySelector('.overlay');

// Функция открытия модального окна и закрытия 
const openCloseModal = () => {
  modal.classList.toggle('modal-open');
  overlayModal.classList.toggle('is-visible');
};

modal.addEventListener('click', event => {
  event.stopImmediatePropagation();
})

addProduct.addEventListener('click', openCloseModal);
closeBtn.addEventListener('click', openCloseModal);
overlayModal.addEventListener('click', openCloseModal);
