
// Функция создания строки с товаром
const renderGoods = (err, data) => {
  console.log('data: ', data);
  if (err) {
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = 'Не удалось загрузить товары.';
    document.querySelector('.cms-wrapper__title')
        .insertAdjacentElement('afterend', h2);
    return;
  }

  const goods = data.map(item => {
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
            <button class="td-button td-button-edit"></button>
            <button class="td-button td-button-delete"></button>
          </div>
        </td>
    `);
    return tr;
  });
  document.querySelector('.table-list').append(...goods);
};
export default renderGoods;
