import showDeleteModal from './deleteModal.js';

const deleteGood = (tableList, fetchRequest, renderGoods,
    initGoods, numberPages) => {
  tableList.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.classList.contains('td-button-delete')) {
      const id = target.closest('.product-card')
          .querySelector('.td-id').textContent;
      showDeleteModal(tableList, fetchRequest,
          renderGoods, initGoods, numberPages, id);
      e.target.closest('.product-card').remove();
    }
  });
};

export default deleteGood;
