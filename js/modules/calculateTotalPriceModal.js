
// Высчитывание общей стоимости в модальном окне
const calculateTotalPriceModal = (inputPrice, inputCount, span) => {
  inputPrice.addEventListener('blur', () => {
    const sum = inputPrice
        .value * inputCount.value;
    span.textContent = `$ ${sum}`;
  });
  inputCount.addEventListener('blur', () => {
    const sum = +inputPrice
        .value * +inputCount.value;
    span.textContent = `$ ${sum}`;
  });
};

export default calculateTotalPriceModal;
