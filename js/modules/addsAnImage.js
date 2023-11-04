// Добавление файла изображения в модальное окно

const addsAnImage = (inputImage, imgCard, fieldsetWarning) => {
  inputImage.addEventListener('change', async () => {
    if (inputImage.files.length > 0) {
      if (inputImage.files[0].size <= 1000000) {
        const src = URL.createObjectURL(inputImage.files[0]);
        imgCard.src = src;
        imgCard.style.display = 'block';
        if (fieldsetWarning.style.display === 'block') {
          fieldsetWarning.style = 'display: none';
        }
      } else {
        fieldsetWarning.style = 'display: block';
      }
    }
  });
};

export default addsAnImage;
