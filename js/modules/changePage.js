
const changePage = async (fetchRequest, renderGoods,
    tableList, btnLeft, btnRight) => {
  let data = await fetchRequest('/api/goods', {
    callback: (err, data) => data,
  });

  const pageLength = data.pages;
  let currentPage = data.page;

  btnLeft.addEventListener('click', async () => {
    if (currentPage > 1) {
      const goods = await fetchRequest(`/api/goods?page=${currentPage - 1}`, {
        callback: renderGoods,
      });
      tableList.append(goods);
      data = await fetchRequest(`/api/goods?page=${pageLength - 1}`, {
        callback: (err, data) => data,
      });
      currentPage = data.page;
      document.querySelector('.number-pages').textContent =
        `${data.page === 1 ? `1-${data.goods.length} of ${data.totalCount}` :
        `${((data.page - 1) * 10) + 1} - ${data.totalCount} 
        of ${data.totalCount}`}`;
    }
  });

  btnRight.addEventListener('click', async () => {
    if (currentPage < pageLength) {
      const goods = await fetchRequest(`/api/goods?page=${currentPage + 1}`, {
        callback: renderGoods,
      });
      tableList.append(goods);
      data = await fetchRequest(`/api/goods?page=${currentPage + 1}`, {
        callback: (err, data) => data,
      });
      currentPage = data.page;
      document.querySelector('.number-pages').textContent =
      `${data.page === 1 ? `1-${data.goods.length} of ${data.totalCount}` :
      `${((data.page - 1) * 10) + 1} - ${data.totalCount} 
      of ${data.totalCount}`}`;
    }
  });
};

export default changePage;
