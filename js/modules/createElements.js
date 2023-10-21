import {fetchRequest} from './loadSendGoods.js';
import {showModal} from './modal.js';
import {URL} from '../script.js';

// Функция создания строки с товаром
const renderGoods = (err, data) => {
  if (err) {
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = 'Не удалось загрузить товары.';
    document.querySelector('.cms-wrapper__title')
        .insertAdjacentElement('afterend', h2);
    return;
  }
  document.querySelector('.table-list').textContent = '';
  const goods = data.goods.map(item => {
    const tr = document.createElement('tr');
    tr.classList.add('product-card');

    let totalSum;
    if (item.discount) {
      totalSum = Math.ceil(item.price * item.count -
      (item.price * item.count * (item.discount / 100)));
    } else {
      totalSum = item.price * item.count;
    }

    tr.insertAdjacentHTML('beforeend', `
        <td class="td-id">${item.id}</td>
        <td class="td-title">${item.title}</td>
        <td>${item.category}</td>
        <td class="td-unit">${item.units}</td>
        <td class="td-sum">${+item.count}</td>
        <td class="td-disc">${item.discount}</td>
        <td>${+item.price}</td>
        <td>${totalSum}</td>
        <td class="td-last">
          <div class="td-btn-wrapper">
            <a class="td-button td-button-image"
            data-pic="${item.image}"
            href=""></a>
            <button class="td-button td-button-edit" data-id="${item.id}">
            </button>
            <button class="td-button td-button-delete"></button>
          </div>
        </td>
    `);

    return tr;
  });

  document.querySelector('.table-list').append(...goods);

  return new Promise(resolve => {
    document.querySelector('.cms-wrapper__table').addEventListener('click',
        async ({target}) => {
          if (target.classList.contains('td-button-edit')) {
            const checkGoods =
            await fetchRequest(`${URL}/${target.dataset.id}`, {
              callback: showModal,
            });
            console.log(checkGoods);
          }
          if (target.classList.contains('cms-btn')) {
            showModal();
          }
          if (target.classList.contains('td-button-delete')) {
            const id = target.closest('.product-card')
                .querySelector('.td-id').textContent;
            await fetchRequest(`${URL}/${id}`, {
              method: 'DELETE',
              callback: () => {
              },
            });
            fetchRequest(URL, {callback: renderGoods});
          }
        });
  });
};

export default renderGoods;
