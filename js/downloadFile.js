function handleFileUpload({
  inputSelector,
  targetContainerSelector,
  templateCallback,
  maxFiles = 5,
  allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
  onError = (message) => alert(message),
  onSuccess = (file) => console.log(`Dosya yüklendi: ${file.name}`),
}) {
  const fileInput = document.querySelector(inputSelector);
  const targetContainer = document.querySelector(targetContainerSelector);

  if (!fileInput || !targetContainer) {
    onError("Gerekli elemanlar bulunamadı!");
    return;
  }

  fileInput.click();

  fileInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);

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

      const template = templateCallback(file);

      targetContainer.insertAdjacentHTML("beforeend", template);

      onSuccess(file);
    });

    fileInput.value = "";
  });
}
