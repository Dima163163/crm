
// Проверка при заполнении формы
const validationInput = (inputName, textareaDescription,
    inputCategory, inputUnits, inputDiscountInner, inputCount, inputPrice) => {
  const paternWord = /[^а-яёА-ЯЁa-zA-Z\s]/i;
  const paternWordCir = /[^а-яёА-ЯЁa-zA-Z\s]/i;
  const paternWordNumb = /[^0-9]/i;

  const replaceValue = (selector, pattern) => {
    selector.value =
    selector.value.replace(pattern, '');
  };

  inputName.addEventListener('input', () => {
    replaceValue(inputName, paternWord);
  });

  textareaDescription.addEventListener('input', () => {
    replaceValue(textareaDescription, paternWord);
  });

  inputCategory.addEventListener('input', () => {
    replaceValue(inputCategory, paternWord);
  });

  inputUnits.addEventListener('input', () => {
    replaceValue(inputUnits, paternWordCir);
  });

  inputDiscountInner.addEventListener('input', () => {
    replaceValue(inputDiscountInner, paternWordNumb);
  });

  inputCount.addEventListener('input', () => {
    replaceValue(inputCount, paternWordNumb);
  });

  inputPrice.addEventListener('input', () => {
    replaceValue(inputPrice, paternWordNumb);
  });
};

export default validationInput;
