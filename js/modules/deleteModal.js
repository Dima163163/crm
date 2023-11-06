
const actionSelection = (btns, fetchRequest, renderGoods,
    initGoods, numberPages, id, tableList, overlay) => {
  btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.target;
      if (target.hasAttribute('data-action-type', 'btn-delete-agree')) {
        await fetchRequest(`/api/goods/${id}`, {
          method: 'DELETE',
          callback: () => {
          },
        });
        initGoods(fetchRequest, renderGoods, tableList, numberPages);
        overlay.remove();
      } else {
        overlay.remove();
      }
    });
  });
};


const showDeleteModal = (tableList, fetchRequest, renderGoods,
    initGoods, numberPages, id) => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay-delete', 'is-visible');

  const modal = document.createElement('div');
  modal.classList.add('modal-delete');

  const title = document.createElement('h3');
  title.classList.add('modal-delete-title');
  title.textContent = 'Вы уверены что хотите удалить этот товар?';

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btnAgree = document.createElement('button');
  btnAgree.classList.add('btn-delete', 'btn-delete-agree');
  btnAgree.setAttribute('data-action-type', 'btn-delete-agree');
  btnAgree.type = 'button';
  btnAgree.textContent = 'Удалить';

  const btnRefuse = document.createElement('button');
  btnRefuse.classList.add('btn-delete', 'btn-delete-refuse');
  btnAgree.setAttribute('data-action-type', 'btn-delete-refuse');
  btnRefuse.type = 'button';
  btnRefuse.textContent = 'Оставить';
  btnWrapper.append(btnAgree, btnRefuse);

  modal.append(title, btnWrapper);
  overlay.append(modal);
  document.querySelector('body').append(overlay);

  const btns = document.querySelectorAll('.btn-delete');
  console.log('btns: ', btns);

  actionSelection(btns, fetchRequest, renderGoods,
      initGoods, numberPages, id, tableList, overlay);
};

export default showDeleteModal;
