

// Функция создания строки с товаром
const createRow = (obj, list) => {
  const tr = document.createElement('tr');
  tr.classList.add('product-card');

  const randomId = Math.round(Math.random() * 1000000000);
  if (!obj.id) {
    obj.id = randomId;
  }

  let totalSum;
  if (obj.discont) {
    totalSum = Math.ceil(obj.price * obj.count -
    (obj.price * obj.count * (obj.discont / 100)));
  } else {
    totalSum = obj.price * obj.count;
  }

  tr.insertAdjacentHTML('beforeend', `
      <td class="td-id">${obj.id}</td>
      <td class="td-title">${obj.title}</td>
      <td>${obj.description}</td>
      <td class="td-unit">${obj.units}</td>
      <td class="td-sum">${+obj.count}</td>
      <td class="td-disc">${obj.discont ? obj.discont : 'false'}</td>
      <td>${+obj.price}</td>
      <td>${totalSum}</td>
      <td class="td-last">
        <div class="td-btn-wrapper">
          <a class="td-button td-button-image"
          href="${obj.images ? obj.images.small : obj.images}"></a>
          <button class="td-button td-button-edit"></button>
          <button class="td-button td-button-delete"></button>
        </div>
      </td>
  `);
  list.append(tr);
  return tr;
};
export default createRow;
