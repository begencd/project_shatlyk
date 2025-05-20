var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".my-swiper-button-next",
    prevEl: ".my-swiper-button-prev",
  },
});

var swiper2 = new Swiper(".myTocnoSwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: ".my-tocno-swiper-button-next",
    prevEl: ".my-tocno-swiper-button-prev",
  },
});
