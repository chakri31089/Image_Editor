const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  Blur = 0,
  opacity = 100,
  contrast = 100,
  shadows = 0,
  hue = 0,
  sepia = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    resetFilterBtn.click();
    document.querySelector(".container").classList.remove("disable");
  });
};

const applyFilter = () => {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) Blur(${Blur}px) contrast(${contrast}%) hue-rotate(${hue}deg) opacity(${opacity}%) drop-shadow(0px 0px ${shadows}px rgba(0, 0, 0, 0.5)) sepia(${sepia}%)`;
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = 200;
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = 200;
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = 100;
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = 100;
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    } else if (option.id === "Blur") {
      filterSlider.max = 100;
      filterSlider.value = Blur;
      filterValue.innerText = `${Blur}px`;
    } else if (option.id === "opacity") {
      filterSlider.max = 100;
      filterSlider.value = opacity;
      filterValue.innerText = `${opacity}%`;
    } else if (option.id === "contrast") {
      filterSlider.max = 200;
      filterSlider.value = contrast;
      filterValue.innerText = `${contrast}%`;
    } else if (option.id === "shadows") {
      filterSlider.max = 100;
      filterSlider.value = shadows;
      filterValue.innerText = `${shadows}%`;
    } else if (option.id === "hue") {
      filterSlider.max = 360;
      filterSlider.value = hue;
      filterValue.innerText = `${hue}deg`;
    } else {
      filterSlider.max = 100;
      filterSlider.value = sepia;
      filterValue.innerText = `${sepia}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "saturation") {
    saturation = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "inversion") {
    inversion = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "grayscale") {
    grayscale = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "Blur") {
    Blur = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "opacity") {
    opacity = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "contrast") {
    contrast = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "shadows") {
    shadows = parseInt(filterSlider.value);
  } else if (selectedFilter.id === "hue") {
    hue = parseInt(filterSlider.value);
  } else {
    sepia = parseInt(filterSlider.value);
  }
  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal *= -1;
    } else {
      flipVertical *= -1;
    }
    applyFilter();
  });
});

const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  Blur = 0;
  opacity = 100;
  contrast = 100;
  shadows = 0;
  hue = 0;
  sepia = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilter();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) Blur(${Blur}px) opacity(${opacity}%) contrast(${contrast}%) drop-shadow(0px 0px ${shadows}px rgba(0, 0, 0, 0.5)) hue-rotate(${hue}deg) sepia(${sepia}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
