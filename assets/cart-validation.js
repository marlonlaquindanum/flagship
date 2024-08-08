document.addEventListener('DOMContentLoaded', () => {
  const checkoutButton = document.getElementById('checkout');

  checkoutButton.addEventListener('click', event => {
    let hasError = false;

    document.querySelectorAll('input[id^="cart-item-limits-"]').forEach(function (limitsElement) {
      const min = parseInt(limitsElement.getAttribute('data-min'), 10);
      const max = parseInt(limitsElement.getAttribute('data-max'), 10);
      const sku = limitsElement.getAttribute('data-sku');
      const quantity = parseInt(limitsElement.getAttribute('data-quantity'), 10);

      if (quantity < min) {
        alert(`You can’t proceed with less than ${min} quantity of ${sku} in your cart.`);
        hasError = true;
      } else if (quantity > max) {
        alert(`You can’t proceed with more than ${max} quantity of ${sku} in your cart.`);
        hasError = true;
      }
    });

    if (hasError) {
      event.preventDefault();
    }
  });
});