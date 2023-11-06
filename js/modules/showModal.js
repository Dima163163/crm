import {loadStyle} from './loadStyle.js';
import addsAnImage from './addsAnImage.js';
import activationInputDiscount from './activationInputDiscount.js';
import modalClose from './modalClose.js';
import calculateTotalPriceModal from './calculateTotalPriceModal.js';
import validationInput from './inputValidation.js';
import formValidationAndSend from './validateFormAndSend.js';
import modalErrorClose from './modalErrorClose.js';
import {fetchRequest} from './fetchRequest.js';
import createOverlay from './createOverlay.js';

export const showModal = async (err, data) => {
  await loadStyle('style/modal.css');

  const overlay = createOverlay();

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
  inputName.required = true;
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
  textareaDescription.required = true;
  textareaDescription.minLength = 10;
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

  const inputCategory = document.createElement('select');
  inputCategory.name = 'category';
  inputCategory.id = 'category';
  inputName.required = true;
  inputCategory.classList.add('crm-wrapper__input',
      'crm__category-input', 'elem-form-validate');
  const option = document.createElement('option');
  if (data) {
    option.value = data.category;
    option.textContent = data.category;
  } else {
    option.value = '';
    option.textContent = '';
  }
  inputCategory.append(option);

  const dataOptions = await fetchRequest('/api/categories', {
    callback: (err, data) => data,
  });

  const options = dataOptions.map(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    return option;
  });
  inputCategory.append(...options);


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
  inputUnits.required = true;
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
  inputCount.required = true;
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
  inputPrice.required = true;
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
      'crm-image__input',
  );

  const inpitImageData = document.createElement('input');
  inpitImageData.classList.add('input-image-data');
  inpitImageData.name = 'imagedata';
  inpitImageData.style.display = 'none';
  if (data.image) {
    inpitImageData.value = data.image;
  }
  fieldsetCrmImage.append(inpitImageData);

  fieldsetCrmImage.append(labelImage, inputImage);
  fieldsetCrmData.append(fieldsetCrmImage);

  const divImg = document.createElement('div');
  divImg.classList.add('crm-product-wrapper');

  const imgCard = document.createElement('img');
  imgCard.classList.add('crm-product-card');
  if (data) {
    imgCard.src = `http://localhost:3000/${data.image}`;
    imgCard.style = 'display: block';
  }

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

  const modalError = document.createElement('div');
  modalError.classList.add('modal-error');
  const modalErrorBtn = document.createElement('button');
  modalErrorBtn.classList.add('modal-close-error');
  const modalErrorBtnImg = document.createElement('img');
  modalErrorBtnImg.classList.add('modal-close__img');
  modalErrorBtnImg.src = 'img/close.svg';
  modalErrorBtnImg.alt = 'Кнопка закрытия';
  modalErrorBtn.append(modalErrorBtnImg);
  modalError.append(modalErrorBtn);
  modalError.insertAdjacentHTML('beforeend', `
    <div class="modal-error__wrapper">
      <div class="modal-error__img"></div>
      <p class="modal-error__text">
        Что-то пошло не так
      </p>
    </div>
  `);

  modal.append(modalError);

  document.querySelector('body').append(overlay);

  // Вызов функции добавления картинки
  addsAnImage(inputImage, imgCard, fieldsetWarning);

  // Вызов функции активации checkbox input discount
  activationInputDiscount(form, inputDiscountChecbox, inputDiscountInner);

  // Вызов функции закрытия модального окна
  modalClose(overlay);

  // Вызов функции высчитывания общей стоимости товара в модальном окне
  calculateTotalPriceModal(inputPrice, inputCount, span);

  // Вызов функции для проверки при заполении input
  validationInput(inputName, textareaDescription,
      inputCategory, inputUnits, inputDiscountInner, inputCount, inputPrice,
  );

  // Вызов функции проверки формы перед отправкой
  if (!data) {
    formValidationAndSend(form, modalError, overlay, 'POST', '/api/goods');
  } else {
    formValidationAndSend(form, modalError, overlay, 'PATCH',
        `/api/goods/${data.id}`);
  }

  // Вызов функции закрытия модального окна с предупреждением
  modalErrorClose(modalErrorBtn, modalError);
};
