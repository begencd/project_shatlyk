var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".my-swiper-button-next",
    prevEl: ".my-swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
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
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: ".my-tocno-swiper-button-next",
    prevEl: ".my-tocno-swiper-button-prev",
  },
});

var swiper3 = new Swiper(".krasnodorSwiper", {
  slidesPerView: 1.4,
  spaceBetween: 20,
});

var swiper4 = new Swiper(".krasnodor2Swiper", {
  slidesPerView: 1.4,
  spaceBetween: 20,
});

var swiper5 = new Swiper(".krasnodor3Swiper", {
  slidesPerView: 1.4,
  spaceBetween: 20,
});
