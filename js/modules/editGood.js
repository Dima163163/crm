
const editGood = async (tableList, fetchRequest, renderGoods,
    initGoods, numberPages, showModal) => {
  tableList.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.classList.contains('td-button-edit')) {
      await fetchRequest(`/api/goods/${target.dataset.id}`, {
        callback: (err, data) => {
          showModal(err, data);
          initGoods(fetchRequest, renderGoods, tableList,
              numberPages, `/api/goods`);
        },
      });
    }
  });
};

export default editGood;
