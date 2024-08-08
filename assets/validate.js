document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.querySelector('[name="add"]');
  const quantityInput = document.querySelector('input[name="quantity"]');
  const variantInput = document.querySelector('input[name="id"]');

  addToCartButton.addEventListener('click', event => {
    const selectedVariantId = variantInput.value;
    const limitsElement = document.querySelector(`#variant-limits-${selectedVariantId}`);

    if (limitsElement) {
      const min = parseInt(limitsElement.getAttribute('data-min'), 10);
      const max = parseInt(limitsElement.getAttribute('data-max'), 10);
      const sku = limitsElement.getAttribute('data-sku');
      const quantity = parseInt(quantityInput.value, 10);

      if (quantity < min) {
        alert(`You can’t add less than ${min} quantity of ${sku}.`);
        event.preventDefault();
      } else if (quantity > max) {
        alert(`You can’t add more than ${max} quantity of ${sku}.`);
        event.preventDefault();
      }
    }
  });

  document.querySelectorAll('.variant-selector').forEach(selector => {
    selector.addEventListener('change', () => {
      quantityInput.value = 1;
    });
  });
});