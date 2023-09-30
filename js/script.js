'use strict';
const body = document.querySelector('body');
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
const tableList = document.querySelector('.table-list');

let newArr;

const arr = [
  {
    "id": 246016548,
    "title": "Навигационная система Soundmax",
    "description": "Техника для дома",
    "price": 100,
    "priceTotal": 500,
    "units": "шт",
    "count": 5,
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 937295527,
    "title": "Настольная игра “На 4-х ногах”",
    "description": "Настольные игры",
    "price": 14,
    "priceTotal": 168,
    "units": "шт",
    "count": 12,
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
]

// Функция открытия модального окна и закрытия 
const openCloseModal = () => {
  overlayModal.classList.toggle('is-visible');
};

// Функция создания строки с товаром
const createRow = obj => {
  const tr = document.createElement('tr');
  tr.classList.add('product-card');
  console.log(obj)
  
  tr.insertAdjacentHTML('beforeend', `
      <td class="td-id">${obj.id}</td>
      <td class="td">${obj.title}</td>
      <td>${obj.description}</td>
      <td class="td-unit">${obj.units}</td>
      <td class="td-sum">${obj.count}</td>
      <td>${obj.price}</td>
      <td>${obj.priceTotal}</td>
      <td class="td-last">
        <div class="td-btn-wrapper">
          <a class="td-button td-button_image" href="${obj.images.small}"></a>
          <button class="td-button td-button_edit"></button>
          <button class="td-button td-button_delete"></button>
        </div>
      </td>
  `);
  tableList.append(tr);
}

// Функция перебора массива с объектами для создания строк
const renderGoods = arr => {
  const arrGoods = arr.map(item => createRow(item));

  return arrGoods;
}
renderGoods(arr)

addProduct.addEventListener('click', openCloseModal);

overlayModal.addEventListener('click', e => {
  const target = e.target;
  if(target === overlayModal || target.closest('.modal-close')) {
    openCloseModal();
  }
});

tableList.addEventListener('click', e => {
  const target = e.target;
  const idElement = document.querySelector('.td-id');
  const value = Number(idElement.textContent);
  if(target.closest('.td-button_delete')) {
    target.closest('.product-card').remove();
    newArr = arr.filter((item) => {
      return item.id !== value
    })
    console.log(newArr)
  }
});
