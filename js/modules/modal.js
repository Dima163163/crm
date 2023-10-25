import {fetchRequest} from './loadSendGoods.js';
import {loadStyle} from './loadStyle.js';
import {URL as url} from '../script.js';
import renderGoods from './createElements.js';
import {totalSumPage} from './control.js';

export const showModal = async (err, data) => {
  await loadStyle('style/modal.css');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'is-visible');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  overlay.append(modal);

  const button = document.createElement('button');
  button.classList.add('modal-close');
  button.insertAdjacentHTML('beforeend', `
    <img src="img/close.svg" alt="Кнопка закрытия" class="modal-close__img">
  `);
  modal.append(button);

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal__wrapper');
  modal.append(modalWrapper);

  const modalTitleWrapper = document.createElement('div');
  modalTitleWrapper.classList.add('modal__title-wrapper');

  const h2 = document.createElement('h2');
  h2.classList.add('modal__title');
  h2.textContent = `${data ? 'Изменить товар' : 'Добавить товар'}`;
  modalTitleWrapper.append(h2);
  modalWrapper.append(modalTitleWrapper);

  if (data) {
    const pId = document.createElement('p');
    pId.classList.add('modal__id');
    pId.textContent = 'id ';
    const spanId = document.createElement('span');
    spanId.classList.add('modal__id-number');
    spanId.textContent = data.id;
    pId.append(spanId);
    modalTitleWrapper.append(pId);
  }

  const form = document.createElement('form');
  form.id = 'example';
  form.classList.add('form');
  modalWrapper.append(form);

  const fieldsetCrmData = document.createElement('fieldset');
  fieldsetCrmData.classList.add('crm-data');
  form.append(fieldsetCrmData);

  const fieldsetCrm = document.createElement('fieldset');
  fieldsetCrm.classList.add('crm');
  fieldsetCrmData.append(fieldsetCrm);

  const fieldsetCrmName = document.createElement('fieldset');
  fieldsetCrmName.classList.add('crm-wrapper', 'crm__name');
  fieldsetCrm.append(fieldsetCrmName);


  const labelName = document.createElement('label');
  labelName.setAttribute('for', 'name');
  labelName.classList.add('crm-wrapper__title', 'crm__name-title');
  labelName.textContent = 'Наименование';

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.name = 'title';
  inputName.classList.add('crm-wrapper__input',
      'crm__name-input', 'elem-form-validate');
  inputName.value = `${data ? data.title : ''}`;

  fieldsetCrmName.append(labelName, inputName);

  const fieldsetCrmDescription = document.createElement('fieldset');
  fieldsetCrmName.classList.add('crm-wrapper', 'crm__description');
  fieldsetCrm.append(fieldsetCrmDescription);

  const labelDescription = document.createElement('label');
  labelDescription.for = 'description';
  labelDescription.classList.add('crm-wrapper__title',
      'crm__descpiption-title');
  labelDescription.textContent = 'Описание';

  const textareaDescription = document.createElement('textarea');
  textareaDescription.name = 'description';
  textareaDescription.id = 'description';
  // textareaDescription.required = true;
  textareaDescription.classList.add('crm-wrapper__textarea',
      'crm__descpiption-textarea', 'elem-form-validate-text');
  textareaDescription.value = `${data ? data.description : ''}`;

  fieldsetCrmDescription.append(labelDescription, textareaDescription);

  const fieldsetCrmCategory = document.createElement('fieldset');
  fieldsetCrmCategory.classList.add('crm-wrapper', 'crm__category');
  fieldsetCrm.append(fieldsetCrmCategory);

  const labelCategory = document.createElement('label');
  labelCategory.setAttribute('for', 'category');
  labelCategory.classList.add('crm-wrapper__title', 'crm__category-title');
  labelCategory.textContent = 'Категория';

  const inputCategory = document.createElement('input');
  inputCategory.type = 'text';
  inputCategory.name = 'category';
  inputCategory.id = 'category';
  // inputCategory.required = true;
  inputCategory.classList.add('crm-wrapper__input',
      'crm__category-input', 'elem-form-validate');
  inputCategory.value = `${data ? data.category : ''}`;

  fieldsetCrmCategory.append(labelCategory, inputCategory);

  const fieldsetCrmUnits = document.createElement('fieldset');
  fieldsetCrmUnits.classList.add('crm-wrapper', 'crm__units');
  fieldsetCrm.append(fieldsetCrmUnits);

  const labelUnits = document.createElement('label');
  labelUnits.setAttribute('for', 'units');
  labelUnits.classList.add('crm-wrapper__title', 'crm__units-title');
  labelUnits.textContent = 'Еденицы измерения';

  const inputUnits = document.createElement('input');
  inputUnits.type = 'text';
  inputUnits.name = 'units';
  inputUnits.id = 'units';
  // inputUnits.required = true;
  inputUnits.classList.add('crm-wrapper__input',
      'crm__units-input', 'elem-form-validate');
  inputUnits.value = `${data ? data.units : ''}`;

  fieldsetCrmUnits.append(labelUnits, inputUnits);

  const fieldsetCrmDiscount = document.createElement('fieldset');
  fieldsetCrmDiscount.classList.add('crm-wrapper', 'crm__discont');
  fieldsetCrm.append(fieldsetCrmDiscount);

  const labelDiscount = document.createElement('label');
  labelDiscount.setAttribute('for', 'discont');
  labelDiscount.classList.add('crm-wrapper__title', 'crm__discont-title');
  labelDiscount.textContent = 'Дисконт';
  fieldsetCrmDiscount.append(labelDiscount);

  const fieldsetCrmDiscountInner = document.createElement('fieldset');
  fieldsetCrmDiscountInner.id = 'discont';
  fieldsetCrmDiscountInner.classList.add('crm__discont-wrapper');

  const inputDiscountChecbox = document.createElement('input');
  inputDiscountChecbox.type = 'checkbox';
  inputDiscountChecbox.name = 'discount-checkbox';
  inputDiscountChecbox.id = 'discont-checkbox';
  inputDiscountChecbox.classList.add('crm__checkbox-input');

  const labelDiscountInner = document.createElement('label');
  labelDiscountInner.setAttribute('for', 'discont-checkbox');
  labelDiscountInner.classList.add('crm__checkbox');

  const inputDiscountInner = document.createElement('input');
  inputDiscountInner.type = 'number';
  inputDiscountInner.name = 'discount';
  inputDiscountInner.id = 'discont-inpit';
  inputDiscountInner.classList.add('crm-wrapper__input', 'crm__discont-input');
  inputDiscountInner.disabled = true;
  inputDiscountInner.value = `${data ? data.discount : ''}`;
  fieldsetCrmDiscountInner.append(inputDiscountChecbox, labelDiscountInner,
      inputDiscountInner);
  fieldsetCrmDiscount.append(fieldsetCrmDiscountInner);


  const fieldsetCrmCount = document.createElement('fieldset');
  fieldsetCrmCount.classList.add('crm-wrapper', 'crm__count');
  fieldsetCrm.append(fieldsetCrmCount);

  const labelCount = document.createElement('label');
  labelCount.setAttribute('for', 'count');
  labelCount.classList.add('crm-wrapper__title', 'crm__count-title');
  labelCount.textContent = 'Количество';

  const inputCount = document.createElement('input');
  inputCount.type = 'number';
  inputCount.name = 'count';
  inputCount.id = 'count';
  // inputCount.required = true;
  inputCount.classList.add('crm-wrapper__input',
      'crm__count-input', 'crm__sum-input', 'elem-form-validate');
  inputCount.value = `${data ? data.count : ''}`;

  fieldsetCrmCount.append(labelCount, inputCount);

  const fieldsetCrmPrice = document.createElement('fieldset');
  fieldsetCrmPrice.classList.add('crm-wrapper', 'crm__price');
  fieldsetCrm.append(fieldsetCrmPrice);

  const labelPrice = document.createElement('label');
  labelPrice.setAttribute('for', 'price');
  labelPrice.classList.add('crm-wrapper__title', 'crm__price-title');
  labelPrice.textContent = 'Цена';

  const inputPrice = document.createElement('input');
  inputPrice.type = 'number';
  inputPrice.name = 'price';
  inputPrice.id = 'price';
  // inputPrice.required = true;
  inputPrice.classList.add('crm-wrapper__input',
      'crm__price-input', 'crm__sum-input', 'elem-form-validate');
  inputPrice.value = `${data ? data.price : ''}`;

  fieldsetCrmPrice.append(labelPrice, inputPrice);

  const fieldsetWarning = document.createElement('fieldset');
  fieldsetWarning.classList.add('crm-wrapper', 'crm-warning');
  const pWarning = document.createElement('p');
  pWarning.classList.add('crm-warning__text');
  pWarning.textContent = 'Изображение не должно превышать размер 1 Мб';
  fieldsetWarning.append(pWarning);
  fieldsetCrm.after(fieldsetWarning);

  const fieldsetCrmImage = document.createElement('fieldset');
  fieldsetCrmImage.classList.add('crm-wrapper', 'crm-image');
  fieldsetCrm.append(fieldsetCrmImage);

  const labelImage = document.createElement('label');
  labelImage.setAttribute('for', 'image');
  labelImage.classList.add('crm-image-button');
  labelImage.textContent = 'Добавить изображение';

  const inputImage = document.createElement('input');
  inputImage.type = 'file';
  inputImage.name = 'image';
  inputImage.id = 'image';
  inputImage.accept = 'image/*';
  inputImage.classList.add('crm-wrapper__input',
      'crm-image__input');

  fieldsetCrmImage.append(labelImage, inputImage);
  fieldsetCrmData.append(fieldsetCrmImage);

  const divImg = document.createElement('div');
  divImg.classList.add('crm-product-wrapper');

  const imgCard = document.createElement('img');
  imgCard.classList.add('crm-product-card');

  divImg.append(imgCard);
  form.append(divImg);

  const bottomWrapper = document.createElement('div');
  bottomWrapper.classList.add('modal-bottom-wrapper');

  const p = document.createElement('p');
  p.classList.add('total-cost-form');
  p.textContent = 'Итоговая стоимость: ';

  const span = document.createElement('span');
  span.classList.add('total-cost-form__span');
  span.textContent = `${data ? (data.count * data.price) : ''}`;
  p.append(span);

  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.type = 'submit';
  btn.setAttribute('form', 'example');
  btn.textContent = 'Добавить товар';

  bottomWrapper.append(p, btn);
  modalWrapper.append(bottomWrapper);
  modal.insertAdjacentHTML('beforeend', `
    <div class="modal-error">
      <button class="modal-close-error">
        <img src="img/close.svg" alt="Кнопка закрытия" class="modal-close__img">
      </button>
      <div class="modal-error__wrapper">
        <div class="modal-error__img"></div>
        <p class="modal-error__text">
          Что-то пошло не так
        </p>
      </div>
    </div>
  `);

  document.querySelector('body').append(overlay);

  // Приведение файла изображения в Base64 формат
  const formationToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', err => {
      reject(err);
    });

    reader.readAsDataURL(file);
  });

  // Добавление файла изображения в модальное окно
  inputImage.addEventListener('change', async () => {
    if (inputImage.files.length > 0) {
      if (inputImage.files[0].size <= 1000000) {
        const src = URL.createObjectURL(inputImage.files[0]);
        imgCard.src = src;
        imgCard.style.display = 'block';
        if (fieldsetWarning.style.display === 'block') {
          fieldsetWarning.style = 'display: none';
        }
      } else {
        fieldsetWarning.style = 'display: block';
      }
    }
  });

  // Активация input discount
  document.querySelector('.form').addEventListener('change', () => {
    if (document.querySelector('.crm__checkbox-input').checked) {
      document.querySelector('.crm__discont-input').disabled = false;
    } else {
      document.querySelector('.crm__checkbox-input').checked = false;
      document.querySelector('.crm__discont-input').value = '';
      document.querySelector('.crm__discont-input').disabled = true;
    }
  });
  // Закрытие модального окна
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === document.querySelector('.overlay') ||
    target.closest('.modal-close')) {
      // overlay.classList.remove('is-visible');
      overlay.remove();
    }
  });
  // Высчитывание цены товара в модальном окне
  inputPrice.addEventListener('blur', () => {
    const sum = +document.querySelector('.crm__price-input')
        .value * +document.querySelector('.crm__count-input').value;
    document.querySelector('.total-cost-form__span').textContent = `$ ${sum}`;
  });
  inputCount.addEventListener('blur', () => {
    const sum = +inputPrice
        .value * +inputCount.value;
    span.textContent = `$ ${sum}`;
  });

  // Валидация формы
  const paternWord = /[^а-яёА-ЯЁ\s]/i;
  const paternWordCir = /[^а-яёА-ЯЁ]/i;
  const paternWordNumb = /[^0-9]/i;

  const replaceValue = (selector, pattern) => {
    selector.value =
    selector.value.replace(pattern, '');
  };

  inputName.addEventListener('input', () => {
    replaceValue(inputName, paternWord);
  });

  textareaDescription.addEventListener('input', () => {
    replaceValue(textareaDescription, paternWord);
  });

  inputCategory.addEventListener('input', () => {
    replaceValue(inputCategory, paternWord);
  });

  inputUnits.addEventListener('input', () => {
    replaceValue(inputUnits, paternWordCir);
  });

  inputDiscountInner.addEventListener('input', () => {
    replaceValue(inputDiscountInner, paternWordNumb);
  });

  inputCount.addEventListener('input', () => {
    replaceValue(inputCount, paternWordNumb);
  });

  inputPrice.addEventListener('input', () => {
    replaceValue(inputPrice, paternWordNumb);
  });

  const validateDetector = (list) => {
    console.log('list: ', list);
    let success = true;

    const paternWord = /[а-яёА-ЯЁ\s]/i;
    const paternWordCir = /[а-яёА-ЯЁ]/i;
    const paternWordNumb = /[0-9]/i;

    console.log(Array.isArray(list));
    if (!Array.isArray(list)) {
      console.log('list.name текстареа: ', list.name);
      if (list.name === 'description') {
        if (!paternWord.test(list.value)) {
          success = false;
          return success;
        }
      }
    } else {
      list.forEach(input => {
        if (input.name === 'title' || input.name === 'category') {
          if (!paternWord.test(input.value)) {
            success = false;
          }
        }

        if (input.name === 'units') {
          if (!paternWordCir.test(input.value)) {
            success = false;
          }
        }

        if (input.name === 'count' || input.name === 'price') {
          if (!paternWordNumb.test(input.value)) {
            success = false;
          }
        }
      });
    }

    return success;
  };

  // Отправка данных из формы
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formElementsInput = form.querySelectorAll('.elem-form-validate');
    const formElementsArea = form.querySelector('.elem-form-validate-text');
    if (validateDetector(formElementsInput) &&
  validateDetector(formElementsArea) && formElementsArea.value.length >= 80) {
      const formData = new FormData(e.target);
      const newProduct = Object.fromEntries(formData);
      newProduct.image = await formationToBase64(newProduct.image);

      fetchRequest(url, {
        method: 'POST',
        body: newProduct,
        callback(err) {
          if (err) {
            document.querySelector('.modal-error').classList.add('is-visible');
            return;
          }
          document.querySelector('.table-list').textContent = '';
          fetchRequest(url, {callback: renderGoods});
          document.querySelector('.form').reset();
          document.querySelector('.overlay').remove();
          totalSumPage(span,
              fetchRequest, url);
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  });
};
