let swiperInstances = {};

function initializeSwiper(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (window.innerWidth < 768 && !swiperInstances[containerSelector]) {
    swiperInstances[containerSelector] = new Swiper(containerSelector, {
      slidesPerView: 4,
      spaceBetween: 16,
      freeMode: true,
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        320: {
          slidesPerView: 2.3,
          spaceBetween: 10,
        },
      },
    });
  }
}

function destroySwiper(containerSelector) {
  if (swiperInstances[containerSelector]) {
    swiperInstances[containerSelector].destroy(true, true);
    delete swiperInstances[containerSelector];
  }
}

function handleFileUpload({
  inputSelector,
  targetContainerSelector = "",
  targetImageSelector = "",
  templateCallback,
  maxFiles = 5,
  allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
  onError = (message) => alert(message),
  onSuccess = (file) => console.log(`Dosya yüklendi: ${file.name}`),
}) {
  console.log("handleFileUpload");

  const fileInput = document.querySelector(inputSelector);
  const targetContainer =
    targetContainerSelector.length > 0
      ? document.querySelector(targetContainerSelector)
      : "";

  const targetImage = targetImageSelector
    ? document.querySelector(targetImageSelector)
    : "";

  if (!fileInput || !targetContainer) {
    onError("Gerekli elemanlar bulunamadı!");
    return;
  }

  fileInput.value = "";
  fileInput.click();

  fileInput.onchange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    if (files.length > maxFiles) {
      onError(`Maksimum ${maxFiles} dosya yüklenebilir!`);
      fileInput.value = "";
      return;
    }

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        onError(`İzin verilmeyen dosya türü: ${file.name}`);
        return;
      }
      if (targetImage && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          targetImage.src = e.target.result;
          onSuccess(file);
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileUrl = file.type.startsWith("image/")
            ? e.target.result
            : null;
          const template = templateCallback(file, fileUrl);
          targetContainer.insertAdjacentHTML("beforeend", template);
          onSuccess(file);
          if (window.innerWidth < 768) {
            if (
              swiperInstances[
                targetContainerSelector.replace(" .swiper-wrapper", "")
              ]
            ) {
              swiperInstances[
                targetContainerSelector.replace(" .swiper-wrapper", "")
              ].update();
            } else {
              initializeSwiper(
                targetContainerSelector.replace(" .swiper-wrapper", "")
              );
            }
          }
        };
        if (file.type.startsWith("image/")) {
          reader.readAsDataURL(file);
        } else {
          const template = templateCallback(file, null);
          targetContainer.insertAdjacentHTML("beforeend", template);
          onSuccess(file);
          if (window.innerWidth < 768) {
            if (
              swiperInstances[
                targetContainerSelector.replace(" .swiper-wrapper", "")
              ]
            ) {
              swiperInstances[
                targetContainerSelector.replace(" .swiper-wrapper", "")
              ].update();
            } else {
              initializeSwiper(
                targetContainerSelector.replace(" .swiper-wrapper", "")
              );
            }
          }
        }
      }
    });

    fileInput.value = "";
  };
}

const downloadFileTemplate = (file, fileUrl = null) => {
  const fileElementId = `file-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const slideClass = window.innerWidth < 768 ? "swiper-slide" : "";

  if (file.type.startsWith("image/") && fileUrl) {
    return `
      <div id="${fileElementId}" class="h-30 md:w-30 w-full rounded-xl shadow-md relative group ${slideClass} gap-4">
        <img src="${fileUrl}" alt="${
      file.name
    }" class="h-30 md:w-30 w-full object-cover rounded-xl" />
        <div class="h-30 md:w-30 w-full absolute left-0 top-0 flex items-center justify-center bg-black/10 md:bg-black/20 rounded-xl z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity md:group-hover:pointer-events-auto md:pointer-events-none">
          <button class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onclick="document.getElementById('${fileElementId}').remove(); if (window.innerWidth < 768 && swiperInstances['${
      document.querySelector(".swiper").id
    }']) { swiperInstances['${
      document.querySelector(".swiper").id
    }'].update(); }">
            <i class="mdi mdi-delete"></i>
          </button>
        </div>
      </div>`;
  } else if (file.type === "application/pdf") {
    return `
      <div id="${fileElementId}" class="size-22.5 rounded-xl flex flex-col items-center justify-center bg-gray-100 shadow-md p-2 text-center relative group ${slideClass}">
        <span class="text-4xl text-red-500 mdi mdi-file-pdf-box"></span>
        <span class="text-xs text-gray-700 break-words mt-1">${file.name}</span>
        <button class="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onclick="document.getElementById('${fileElementId}').remove(); if (window.innerWidth < 768 && swiperInstances['${
      document.querySelector(".swiper").id
    }']) { swiperInstances['${
      document.querySelector(".swiper").id
    }'].update(); }">
          <i class="mdi mdi-delete"></i>
        </button>
      </div>`;
  } else {
    return `
      <div id="${fileElementId}" class="size-22.5 rounded-xl flex flex-col items-center justify-center bg-gray-100 shadow-md p-2 text-center relative group ${slideClass}">
        <span class="text-4xl text-gray-500 mdi mdi-file"></span>
        <span class="text-xs text-gray-700 break-words mt-1">${file.name}</span>
        <button class="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onclick="document.getElementById('${fileElementId}').remove(); if (window.innerWidth < 768 && swiperInstances['${
      document.querySelector(".swiper").id
    }']) { swiperInstances['${
      document.querySelector(".swiper").id
    }'].update(); }">
          <i class="mdi mdi-close"></i>
        </button>
      </div>`;
  }
};

function manageSwiperContainers() {
  const containers = document.querySelectorAll(".swiper");
  containers.forEach((container) => {
    const containerSelector = `#${container.id}`;
    const slides = container.querySelectorAll(".swiper-wrapper > div");
    if (window.innerWidth < 768) {
      slides.forEach((slide) => slide.classList.add("swiper-slide"));
      initializeSwiper(containerSelector);
    } else {
      slides.forEach((slide) => slide.classList.remove("swiper-slide"));
      destroySwiper(containerSelector);
      container.classList.add(
        "md:flex",
        "md:items-center",
        "md:justify-end",
        "md:flex-wrap",
        "md:gap-4",
        "md:max-h-[14.6875rem]",
        "md:h-auto"
      );
    }
  });
}

window.addEventListener("resize", manageSwiperContainers);

document.addEventListener("DOMContentLoaded", manageSwiperContainers);
