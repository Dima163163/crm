
export const initGoods = async (fetchRequest,
    renderGoods, tableList, numberPages) => {
  const {err, data} = await fetchRequest(`/api/goods`, {
    callback: (err, data) => ({
      err,
      data,
    }),
  });

  const goods = renderGoods(err, data);
  tableList.append(goods);

  numberPages.textContent =
  `${data.page === 1 ? `1-${data.goods.length} of ${data.totalCount}` :
  `${(data.page - 1) * 10} - ${data.totalCount} of ${data.totalCount}`}`;
};

