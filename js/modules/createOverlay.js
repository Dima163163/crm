const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'is-visible');

  return overlay;
};

export default createOverlay;
