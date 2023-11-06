import formationToBase64 from './formationToBase64.js';
import {fetchRequest} from './fetchRequest.js';
import totalSumPage from './totalSumPage.js';
import elements from './elementsPage.js';
import { initGoods } from './initGoods.js';
import renderGoods from './createElements.js';
const {tableList, totalPriceSpanPage, numberPages} = elements;

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
      console.log('newProduct: ', newProduct);
      await fetchRequest('POST', {
        method: methodVal,
        body: newProduct,
        callback(err) {
          if (err) {
            modalError.classList.add('is-visible');
            return;
          }
          // initGoods(fetchRequest,
          //     renderGoods, tableList, numberPages);
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {err, data} = await fetchRequest(`/api/goods`, {
        callback: (err, data) => ({
          err,
          data,
        }),
      });
      const {errPage, dataLastPage} =
      await fetchRequest(`/api/goods?page=${data.pages}`, {
        callback: (errPage, dataLastPage) => ({
          errPage,
          dataLastPage,
        }),
      });
      const tr = document.createElement('tr');
      tr.classList.add('product-card');
      let totalSum;
      if (newProduct.discount) {
        totalSum = Math.ceil(newProduct.price * newProduct.count -
        (newProduct.price * newProduct.count *
        (newProduct.discount / 100)));
      } else {
        totalSum = newProduct.price * newProduct.count;
      }
      tr.insertAdjacentHTML('beforeend', `
          <td class="td-id">
          ${dataLastPage.goods[dataLastPage.goods.length - 1].id}</td>
          <td class="td-title">${newProduct.title}</td>
          <td>${newProduct.category}</td>
          <td class="td-unit">${newProduct.units}</td>
          <td class="td-sum">${+newProduct.count}</td>
          <td class="td-disc">${newProduct.discount}</td>
          <td>${+newProduct.price}</td>
          <td>${totalSum}</td>
          <td class="td-last">
            <div class="td-btn-wrapper">
              <a class="td-button td-button-image"
              data-pic="${newProduct.image}"
              href=""></a>
              <button class="td-button td-button-edit" 
              data-id="${newProduct.id}">
              </button>
              <button class="td-button td-button-delete"></button>
            </div>
          </td>
      `);
      tableList.append(tr);
      form.reset();
      overlay.remove();
      totalSumPage(totalPriceSpanPage);
    }
  });
};

export default formValidationAndSend;
