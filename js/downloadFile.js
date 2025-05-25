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
  const fileInput = document.querySelector(inputSelector);
  const targetContainer =
    targetContainerSelector.length > 0
      ? document.querySelector(targetContainerSelector)
      : "";

  const targetImage = targetImageSelector
    ? document.querySelector(targetImageSelector)
    : "";

  if (!fileInput) {
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

    console.log(targetImage);

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
        };
        if (file.type.startsWith("image/")) {
          reader.readAsDataURL(file);
        } else {
          const template = templateCallback(file, null);
          targetContainer.insertAdjacentHTML("beforeend", template);
          onSuccess(file);
        }
      }
    });

    fileInput.value = "";
  };
}

const downloadFileTemplate = (file, fileUrl = null) => {
  console.log(file);
  console.log("Dosya URL:", fileUrl);

  if (file.type.startsWith("image/") && fileUrl) {
    return `
      <div class="size-30 rounded-xl overflow-hidden shadow-md">
        <img src="${fileUrl}" alt="${file.name}" class="size-30 object-cover rounded-xl" />
      </div>`;
  } else if (file.type === "application/pdf") {
    return `
      <div class="size-22.5 rounded-xl flex flex-col items-center justify-center bg-gray-100 shadow-md p-2 text-center">
        <span class="text-4xl text-red-500 mdi mdi-file-pdf-box"></span>
        <span class="text-xs text-gray-700 break-words mt-1">${file.name}</span>
      </div>`;
  } else {
    return `
      <div class="size-22.5 rounded-xl flex flex-col items-center justify-center bg-gray-100 shadow-md p-2 text-center">
        <span class="text-4xl text-gray-500 mdi mdi-file"></span>
        <span class="text-xs text-gray-700 break-words mt-1">${file.name}</span>
      </div>`;
  }
};
