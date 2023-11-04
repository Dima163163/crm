// Закрытие модального окна
const modalClose = (overlay) => {
  overlay.addEventListener('click', (e) => {
    const target = e.target;

    if (target === overlay ||
    target.closest('.modal-close')) {
      overlay.remove();
    }
  });
};

export default modalClose;
