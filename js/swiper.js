var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".my-swiper-button-next",
    prevEl: ".my-swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

function calculateSlidesPerView(totalSlides, desiredSlides) {
  return Math.min(totalSlides, desiredSlides);
}

// Slide sayısını hesapla
const totalSlides = document.querySelectorAll(
  ".myTocnoSwiper .swiper-slide"
).length;

var swiper2 = new Swiper(".myTocnoSwiper", {
  slidesPerView: calculateSlidesPerView(totalSlides, 4),
  spaceBetween: 30,
  centeredSlides: false,
  loop: false,
  watchOverflow: true,
  allowTouchMove: true,
  resistanceRatio: 0.85,
  threshold: 10,
  breakpoints: {
    1024: {
      slidesPerView: calculateSlidesPerView(totalSlides, 4),
      spaceBetween: 40,
    },
    768: {
      slidesPerView: calculateSlidesPerView(totalSlides, 3),
      spaceBetween: 30,
    },
    640: {
      slidesPerView: calculateSlidesPerView(totalSlides, 2),
      spaceBetween: 20,
    },
    320: {
      slidesPerView: Math.min(totalSlides, 1.4),
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: ".my-tocno-swiper-button-next",
    prevEl: ".my-tocno-swiper-button-prev",
  },
});

// var swiper2 = new Swiper(".myTocnoSwiper", {
//   slidesPerView: 4,
//   spaceBetween: 30,
//   breakpoints: {
//     1024: {
//       slidesPerView: 4,
//       spaceBetween: 40,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 30,
//     },
//     640: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     320: {
//       slidesPerView: 1.4,
//       spaceBetween: 10,
//     },
//   },
//   navigation: {
//     nextEl: ".my-tocno-swiper-button-next",
//     prevEl: ".my-tocno-swiper-button-prev",
//   },
// });
// var swiper2 = new Swiper(".myTocnoSwiper", {
//   slidesPerView: "auto", // Otomatik hesaplama
//   spaceBetween: 30,
//   centeredSlides: false,
//   loop: false, // Loop'u kapatıyoruz
//   watchOverflow: true, // Overflow durumunu kontrol et
//   observer: true, // DOM değişikliklerini izle
//   observeParents: true,
//   breakpoints: {
//     1024: {
//       slidesPerView: 4,
//       spaceBetween: 40,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 30,
//     },
//     640: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     320: {
//       slidesPerView: 1.4,
//       spaceBetween: 10,
//     },
//   },
//   navigation: {
//     nextEl: ".my-tocno-swiper-button-next",
//     prevEl: ".my-tocno-swiper-button-prev",
//   },
// });

var swiper3 = new Swiper(".krasnodorSwiper", {
  slidesPerView: 1.4,
  spaceBetween: 10,
});

var swiper4 = new Swiper(".krasnodor2Swiper", {
  slidesPerView: 1.4,
  spaceBetween: 10,
});

var swiper5 = new Swiper(".krasnodor3Swiper", {
  slidesPerView: 1.4,
  spaceBetween: 10,
});
