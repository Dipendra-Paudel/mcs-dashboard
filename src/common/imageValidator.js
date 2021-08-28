const imageValidator = async (file) => {
  let isValid = false;
  const image = new Image();
  image.src = URL.createObjectURL(file);

  return (image.onload = () => {
    const validImageExtensions = ["png", "jpg", "jpeg", "webp"];
    const nameArray = file.name.split(".");
    const imageExtension = nameArray[nameArray.length - 1];
    let count = 0;
    for (let i = 0; i < validImageExtensions.length; i++) {
      if (validImageExtensions[i] === imageExtension.toLowerCase()) {
        count = 1;
        i = validImageExtensions.length;
      }
    }
    isValid = Boolean(count);
    return isValid;
  })();
};

export default imageValidator;
