document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.news-slide');
  const now = new Date();

  slides.forEach(function(slide) {
    const startDate = new Date(slide.getAttribute('data-start'));
    const endDate = new Date(slide.getAttribute('data-end'));

    if (startDate <= now && endDate >= now) {
      slide.classList.add('active');
    } else {
      slide.remove();
    }
  });
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000
    }
  });
});
