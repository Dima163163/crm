// Функция открытия изображения товара в новом окне
const openAnImage = (list) => {
	list.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target;
		if (target.closest('.td-button-image')) {
			const win = open(
				'about:blank',
				'',
				`
            width=600,
            height=600,
            top=${(screen.height - 600) / 2},
            left=${(screen.width - 600) / 2}
          `
			);

			const dataImg = target
				.closest('.td-button-image')
				.getAttribute('data-pic');
			win.document.body.innerHTML = `
      <img src='https://mica-short-xenoposeidon.glitch.me/${dataImg}'>
      `;
		}
	});
};

export default openAnImage;
