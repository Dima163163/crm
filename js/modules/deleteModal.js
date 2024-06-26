import renderGoods from './createElements.js';
import createOverlay from './createOverlay.js';
import {initGoods} from './initGoods.js';
import elements from './elementsPage.js';
import {loadStyle} from './loadStyle.js';
import changePage from './changePage.js';
const {tableList, numberPages, btnLeft, btnRight} = elements;

const actionSelection = (btns, fetchRequest, id, overlay) => {
  btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.target;
      if (target.hasAttribute('data-action-type', 'btn-delete-agree')) {
        await fetchRequest(`/api/goods/${id}`, {
          method: 'DELETE',
          callback: () => {
          },
        });
        initGoods(fetchRequest, renderGoods, tableList,
            numberPages, `/api/goods`);
        changePage(fetchRequest, renderGoods,
            tableList, btnLeft, btnRight);
        overlay.remove();
      } else {
        overlay.remove();
      }
    });
  });
};


const showDeleteModal = async (fetchRequest, id) => {
  await loadStyle('style/modal.css');
  const overlay = createOverlay();

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

  actionSelection(btns, fetchRequest, id, overlay);
};

export default showDeleteModal;
