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

// Функция открытия модального окна
const openModal = () => {
  modal.classList.add('modal-open');
  const modalOpen = document.querySelector('.modal-open');

  overlayModal.style = 'opacity: 1; visibility: visible; display: flex;';
  modalOpen.style = 'display: flex;'
};

// Функция закрытия модального окна
const closeModal = () => {
  overlayModal.style = 'opacity: 0; visibility: hidden; display: none;';
  modal.classList.remove('modal-open');
}

modal.addEventListener('click', event => {
  event.stopImmediatePropagation();
})
addProduct.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlayModal.addEventListener('click', closeModal);