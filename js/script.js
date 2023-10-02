'use strict';
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

// let newArr;

const data = [
  {
    "id": 246016548,
    "title": "Навигационная система Soundmax",
    "description": "Техника для дома",
    "price": 100,
    "units": "шт",
    "discont": 5,
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
    "discont": 15,
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
  let totalSum;
  if(obj.discont) {
    totalSum = Math.ceil(obj.price * obj.count - (obj.price * obj.count *(obj.discont / 100)));
  } else {
    totalSum = obj.price * obj.count;
  }
  
  tr.classList.add('product-card');
  
  tr.insertAdjacentHTML('beforeend', `
      <td class="td-id">${obj.id ? obj.id : ''}</td>
      <td class="td">${obj.title}</td>
      <td>${obj.description}</td>
      <td class="td-unit">${obj.units}</td>
      <td class="td-sum">${+obj.count}</td>
      <td class="td-disc">${obj.discont ? obj.discont : 'false'}</td>
      <td>${+obj.price}</td>
      <td>${totalSum}</td>
      <td class="td-last">
        <div class="td-btn-wrapper">
          <a class="td-button td-button_image" href="${obj.images ? obj.images.small : obj.images}"></a>
          <button class="td-button td-button_edit"></button>
          <button class="td-button td-button_delete"></button>
        </div>
      </td>
  `);
  tableList.append(tr);
  return tr;
}

// Функция активации input со скидкой
const activeCheckDiscount = () => {
  form.addEventListener('change', () => {
    if (checkbox.checked) {
      checkboxInput.disabled = false;
    } else {
      checkboxInput.value = '';
      checkboxInput.disabled = true;
    }
  });
};


// Функция вызова закрытия модального окна
const modalControl = () => {
  overlayModal.addEventListener('click', e => {
    const target = e.target;
    if(target === overlayModal || target.closest('.modal-close')) {
      openCloseModal();
    }
  });
}

// Функция вызова модального окна
const addProductPage = () => {
  addProduct.addEventListener('click', openCloseModal);
};

//Функция добавления продукта из модального окна
const formControl = () => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    addNewProductPage(newProduct, tableList);
    addProductData(newProduct);
    form.reset();
    openCloseModal();
  })
};

// Функция высчитывания итоговой цены товара
const calculatePrice = () => {
    inputPrice.addEventListener('blur', () => {
      const sum = +inputPrice.value * +inputCount.value;
      totalPriceSpanForm.textContent = `$ ${sum}`;
    });
    inputCount.addEventListener('blur', () => {
      const sum = +inputPrice.value * +inputCount.value;
      totalPriceSpanForm.textContent =`$ ${sum}`;
    });
};

//Функция высчитывания общей стоимости в таблице
const totalSumPage = data => {
  console.log(data);
  let totalSum = 0;
  
  data.forEach((product) => {
    if(product.discont) {
      totalSum += Math.ceil(product.price * product.count - (product.price * product.count *(product.discont / 100)));
    } else {
      totalSum += product.price * product.count;
    }
  })

  totalPriceSpanPage.textContent = `$ ${totalSum}`
}

// Функция удаления продукта из таблцы
const deleteProduct = () => {
  let newData;
  tableList.addEventListener('click', e => {
  const target = e.target;
  const idElement = document.querySelector('.td-id');
  const value = Number(idElement.textContent);
  if(target.closest('.td-button_delete')) {
      target.closest('.product-card').remove();
      newData = data.filter((item) => {
        return item.id !== value
      })
    }
  });
  totalSumPage(data);
}

// Функция добавления товара в таблицу
const addNewProductPage = (product, tableList) => {
  tableList.append(createRow(product))
};

//Функция добавления продукта в data
const addProductData = (product) => {
  data.push(product);
  totalSumPage(data);
};

// Функция перебора массива с объектами для создания строк
const renderGoods = arr => {
  const arrGoods = arr.map(item => createRow(item));

  return arrGoods;
}

const init = () => {
  renderGoods(data);
  activeCheckDiscount();
  modalControl();
  addProductPage();
  deleteProduct();
  calculatePrice();
  formControl();
}

init();






