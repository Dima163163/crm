
// Функция открытия модального окна и закрытия
// export const openCloseModal = (elemModal) => {
//   elemModal.classList.toggle('is-visible');
// };

// Функция вызова закрытия модального окна
// export const modalControl = (elemModal) => {
//   elemModal.addEventListener('click', e => {
//     const target = e.target;
//     if (target === elemModal || target.closest('.modal-close')) {
//       openCloseModal(elemModal);
//     }
//   });
// };

// Функция вызова модального окна
// export const addProductPage = (addProductSelector, elemModal) => {
//   addProductSelector.addEventListener('click', () => {
//     openCloseModal(elemModal);
//   });
// };

// Функция добавления товара в таблицу
// export const addNewProductPage = (product, list) => {
//   list.append(createRow(product, list));
// };

// Функция высчитывания общей стоимости в таблице
export const totalSumPage = (totalPageSelector, fetchRequest, url) => {
  fetchRequest(url, {
    method: 'GET',
    callback(err, data) {
      if (err) {
        totalPageSelector.textContent = `Произошла ошибка`;
        return;
      }
      let totalSum = 0;
      data.goods.forEach((product) => {
        if (product.discont) {
          totalSum += Math.ceil(product.price * product.count -
          (product.price * product.count * (product.discont / 100)));
        } else {
          totalSum += product.price * product.count;
        }
        console.log('totalSum: ', totalSum);
        totalPageSelector.textContent = `$ ${totalSum}`;
      });
    },
  });
};

// Функция активации input со скидкой
// export const activeCheckDiscount = (form, checkbox, checkboxInput) => {
//   form.addEventListener('change', () => {
//     if (checkbox.checked) {
//       checkboxInput.disabled = false;
//     } else {
//       checkboxInput.value = '';
//       checkboxInput.disabled = true;
//     }
//   });
// };

// Функция добавления продукта из модального окна
// export const formControl = (formSelector,
//     totalPageSelector, elemModal, fetchRequest,
//     url, renderGoods, tableList) => {
//   document.querySelector('.form').addEventListener('submit', e => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newProduct = Object.fromEntries(formData);
//     console.log('newProduct: ', newProduct);

//     fetchRequest(url, {
//       method: 'POST',
//       body: newProduct,
//       callback(err) {
//         if (err) {
//           document.querySelector('.modal-error').classList.add('is-visible');
//           return;
//         }
//         tableList.textContent = '';
//         fetchRequest(url, {callback: renderGoods});
//         // formSelector.reset();
//         // openCloseModal(elemModal);
//         document.querySelector('.form').reset();
//         document.querySelector('.overlay').remove();
//         totalSumPage(totalPageSelector, fetchRequest, url);
//       },
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   });
// };

// Функция высчитывания итоговой цены товара
// export const calculatePrice = (inputPriceSelector,
//     inputCoutSelector, totalPriceSelector) => {
//   inputPriceSelector.addEventListener('blur', () => {
//     const sum = +inputPriceSelector.value * +inputCoutSelector.value;
//     totalPriceSelector.textContent = `$ ${sum}`;
//   });
//   inputCoutSelector.addEventListener('blur', () => {
//     const sum = +inputPrice.value * +inputCount.value;
//     totalPriceSelector.textContent = `$ ${sum}`;
//   });
// };

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

// Функция открытия изображения товара в новом окне
export const opensAnImage = (list) => {
  list.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;
    if (target.closest('.td-button-image')) {
      const win = open('about:blank', '', `
            width=600,
            height=600,
            top=${(screen.height - 600) / 2},
            left=${(screen.width - 600) / 2}
          `);
      const dataImg = target.closest('.td-button-image')
          .getAttribute('data-pic');
      win.document.body.innerHTML = `
      <img src='${dataImg}'>
      `;
    }
  });
};
