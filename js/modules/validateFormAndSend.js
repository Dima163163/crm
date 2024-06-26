import formationToBase64 from './formationToBase64.js';
import {fetchRequest} from './fetchRequest.js';
import totalSumPage from './totalSumPage.js';
import elements from './elementsPage.js';
import renderGoods from './createElements.js';
import changePage from './changePage.js';
import {initGoods} from './initGoods.js';
const {tableList, totalPriceSpanPage, btnLeft, btnRight,
  numberPages} = elements;

// Проверка заполненности формы при отправке
const formValidationAndSend = (form, modalError, overlay,
    methodVal, postfix) => {
  const validateDetector = (list) => {
    let success = true;

    const paternWord = /[а-яёА-ЯЁa-zA-Z\s]/i;
    const paternWordCir = /[а-яёА-ЯЁa-zA-Z\s]/i;
    const paternWordNumb = /[0-9]/i;

    if (!Array.isArray(list)) {
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
  validateDetector(formElementsArea) && formElementsArea.value.length >= 10) {
      const formData = new FormData(e.target);
      const newProduct = Object.fromEntries(formData);
      newProduct.image = await formationToBase64(newProduct.image);
      if (newProduct.image === 'data:application/octet-stream;base64,') {
        newProduct.image = newProduct.imagedata;
      }

      await fetchRequest(postfix, {
        method: methodVal,
        body: newProduct,
        callback(err) {
          if (err) {
            modalError.classList.add('is-visible');
            return;
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await initGoods(fetchRequest, renderGoods, tableList,
          numberPages, `/api/goods`);
      form.reset();
      overlay.remove();
      totalSumPage(totalPriceSpanPage);
      changePage(fetchRequest, renderGoods,
          tableList, btnLeft, btnRight);
    }
  });
};

export default formValidationAndSend;
