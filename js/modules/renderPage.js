
export const initGoods = async (fetchRequest,
    renderGoods, tableList, numberPages) => {
  const goods = await fetchRequest(`/api/goods`, {
    callback: renderGoods,
  });

  tableList.append(goods);
  const data = await fetchRequest(`/api/goods`, {
    callback: (err, data) => data,
  });

  numberPages.textContent =
  `${data.page === 1 ? `1-${data.goods.length} of ${data.totalCount}` :
  `${(data.page - 1) * 10} - ${data.totalCount} of ${data.totalCount}`}`;
};

