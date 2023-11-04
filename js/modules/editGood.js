
const editGood = (tableList, fetchRequest, renderGoods,
    initGoods, numberPages, showModal) => {
  tableList.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.classList.contains('td-button-edit')) {
      console.log('target.dataset.id: ', target.dataset.id);
      await fetchRequest(`/api/goods/${target.dataset.id}`, {
        callback: (err, data) => {
          showModal(err, data);
          initGoods(fetchRequest, renderGoods, tableList, numberPages);
        },
      });
    }
  });
};

export default editGood;
