import showDeleteModal from './deleteModal.js';

const deleteGood = (tableList, fetchRequest) => {
  tableList.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.classList.contains('td-button-delete')) {
      const id = target.closest('.product-card')
          .querySelector('.td-id').textContent;
      showDeleteModal(fetchRequest, id);
    }
  });
};

export default deleteGood;
