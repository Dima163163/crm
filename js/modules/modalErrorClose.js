const modalErrorClose = (btn, modal) => {
  btn.addEventListener('click', () => {
    modal.classList.remove('is-visible');
  });
};

export default modalErrorClose;
