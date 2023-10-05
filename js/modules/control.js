import createRow from './createElements.js';
import elements from './elementsPage.js';
const {inputPrice, inputCount} = elements;

// Функция открытия модального окна и закрытия
export const openCloseModal = (elemModal) => {
  elemModal.classList.toggle('is-visible');
};

// Функция вызова закрытия модального окна
export const modalControl = (elemModal) => {
  elemModal.addEventListener('click', e => {
    const target = e.target;
    if (target === elemModal || target.closest('.modal-close')) {
      openCloseModal(elemModal);
    }
  });
};

// Функция вызова модального окна
export const addProductPage = (addProductSelector, elemModal) => {
  addProductSelector.addEventListener('click', () => {
    openCloseModal(elemModal);
  });
};

// Функция добавления товара в таблицу
export const addNewProductPage = (product, list) => {
  list.append(createRow(product, list));
};
// Функция высчитывания общей стоимости в таблице
export const totalSumPage = (data, totalPageSelector) => {
  let totalSum = 0;
  data.forEach((product) => {
    if (product.discont) {
      totalSum += Math.ceil(product.price * product.count -
      (product.price * product.count * (product.discont / 100)));
    } else {
      totalSum += product.price * product.count;
    }
  });

  totalPageSelector.textContent = `$ ${totalSum}`;
};

// Функция активации input со скидкой
export const activeCheckDiscount = (form, checkbox, checkboxInput) => {
  form.addEventListener('change', () => {
    if (checkbox.checked) {
      checkboxInput.disabled = false;
    } else {
      checkboxInput.value = '';
      checkboxInput.disabled = true;
    }
  });
};

// Функция добавления продукта в data
export const addProductData = (data, product, totalPageSelector) => {
  data.push(product);
  totalSumPage(data, totalPageSelector);
};

// Функция добавления продукта из модального окна
export const formControl = (data, formSelector,
    totalPageSelector, elemModal, table, list) => {
  formSelector.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    addNewProductPage(newProduct, table, list);
    addProductData(data, newProduct, totalPageSelector);
    formSelector.reset();
    openCloseModal(elemModal);
  });
};

// Функция высчитывания итоговой цены товара
export const calculatePrice = (inputPriceSelector,
    inputCoutSelector, totalPriceSelector) => {
  inputPriceSelector.addEventListener('blur', () => {
    const sum = +inputPriceSelector.value * +inputCoutSelector.value;
    totalPriceSelector.textContent = `$ ${sum}`;
  });
  inputCoutSelector.addEventListener('blur', () => {
    const sum = +inputPrice.value * +inputCount.value;
    totalPriceSelector.textContent = `$ ${sum}`;
  });
};

// Функция удаления продукта из таблцы
export const deleteProduct = (data, table, totalPageSelector) => {
  let newData;
  table.addEventListener('click', e => {
    const target = e.target;
    const idElement = target.closest('.product-card').querySelector('.td-id');
    const value = Number(idElement.textContent);
    if (target.closest('.td-button-delete')) {
      target.closest('.product-card').remove();
      newData = data.filter((item) => item.id !== value);
      totalSumPage(newData, totalPageSelector);
    }
  });
};
