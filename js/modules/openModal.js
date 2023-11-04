import {showModal} from './showModal.js';

// Функция вызова модального окна
const openModal = (wrapperTable) => {
  wrapperTable.addEventListener('click',
      async ({target}) => {
        if (target.classList.contains('cms-btn')) {
          showModal();
        }
      });
};

export default openModal;
