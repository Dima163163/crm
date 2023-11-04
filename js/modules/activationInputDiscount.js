// Активация input discount
const activationInputDiscount = (form,
    inputDiscountChecbox, inputDiscountInner) => {
  form.addEventListener('change', () => {
    if (inputDiscountChecbox.checked) {
      inputDiscountInner.disabled = false;
    } else {
      inputDiscountChecbox.checked = false;
      inputDiscountInner.value = '';
      inputDiscountInner.disabled = true;
    }
  });
};

export default activationInputDiscount;
