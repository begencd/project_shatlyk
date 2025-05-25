const searchInput = document.querySelector('#modalBody input[type="text"]');
const cityListContainer = document.getElementById("cityListContainer");
const selectedCityDisplay = document.getElementById("selectedCityDisplay");

const allCities = [
  { name: "Краснодар", region: "Краснодарский край" },
  { name: "Анапа", region: "Краснодарский край" },
  { name: "Сочи", region: "Краснодарский край" },
  { name: "Москва", region: "Московская область" },
  { name: "Санкт-Петербург", region: "Ленинградская область" },
  { name: "Новороссийск", region: "Краснодарский край" },
  { name: "Ростов-на-Дону", region: "Ростовская область" },
  { name: "Екатеринбург", region: "Свердловская область" },
];

function renderCities(filteredCities) {
  cityListContainer.innerHTML = "";

  if (filteredCities.length === 0 && searchInput.value.trim() !== "") {
    cityListContainer.innerHTML =
      '<p class="text-text2 p-2">Город не найден.</p>';
    return;
  }

  filteredCities.forEach((city) => {
    const cityElement = document.createElement("div");
    cityElement.className =
      "flex items-center gap-x-2 cursor-pointer city-item hover:bg-gray-100 p-2 rounded transition-colors duration-150";
    cityElement.innerHTML = `
      <span class="text-primary text-base font-bold">${city.name}</span>
      <span class="text-base text-text2 font-bold">(${city.region})</span>
    `;
    cityElement.addEventListener("click", () => selectCity(city));
    cityListContainer.appendChild(cityElement);
  });
}

function selectCity(city) {
  if (selectedCityDisplay) {
    selectedCityDisplay.textContent = city.name;
  } else {
    console.warn(
      "ID'si 'selectedCityDisplay' olan şehir gösterme elementi bulunamadı."
    );
  }
  closeModal("reusableModal");
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === "") {
      cityListContainer.innerHTML = "";
      return;
    }

    const filteredCities = allCities.filter(
      (cityData) =>
        cityData.name.toLowerCase().includes(searchTerm) ||
        cityData.region.toLowerCase().includes(searchTerm)
    );
    renderCities(filteredCities);
  });
} else {
  console.error(
    "Arama input elementi bulunamadı. Seçiciyi kontrol edin: '#modalBody input[type=\"text\"]'"
  );
}

const MODAL_TRANSITION_DURATION = 300;

const openModal = (modalId) => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalElement = document.getElementById(modalId);

  if (modalOverlay && modalElement) {
    modalOverlay.classList.remove("hidden");
    modalElement.classList.remove("hidden");

    if (searchInput) {
      searchInput.value = "";
    }
    if (cityListContainer) {
      cityListContainer.innerHTML = "";
    }

    requestAnimationFrame(() => {
      modalOverlay.classList.remove("opacity-0");
      modalElement.classList.remove("opacity-0");
      modalElement.classList.remove("scale-95");
      modalElement.classList.remove("-translate-y-5");
    });
  }
};

const closeModal = (modalId) => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalElement = document.getElementById(modalId);

  if (modalOverlay && modalElement) {
    modalOverlay.classList.add("opacity-0");
    modalElement.classList.add("opacity-0");
    modalElement.classList.add("scale-95");
    modalElement.classList.add("-translate-y-5");
    setTimeout(() => {
      modalOverlay.classList.add("hidden");
      modalElement.classList.add("hidden");
    }, MODAL_TRANSITION_DURATION);
  }
};

document.addEventListener("keydown", function (event) {
  const reusableModal = document.getElementById("reusableModal");
  if (
    event.key === "Escape" &&
    reusableModal &&
    !reusableModal.classList.contains("hidden")
  ) {
    closeModal("reusableModal");
  }
});
