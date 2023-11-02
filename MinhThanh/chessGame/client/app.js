function insertImages() {
  document.querySelectorAll(".box").forEach((image) => {
    if (image.innerHTML.length !== 0) {
      image.innerHTML = `${image.innerHTML}<img
      src="${image.innerHTML}.svg" alt="">`;
      image.style.cursor = "pointer";
    }
  });
}
insertImages();

function fillColorBox() {
  const boxs = document.querySelectorAll(".box");

  boxs.forEach((box) => {
    getId = box.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    aup = eval(arr.shift());
    a = aside + aup;
    console.log({
      getId,
      arr,
      aside,
      aup,
      a,
    });

    if (a % 2 == 0) {
      box.style.backgroundColor = "rgb(232, 235, 239)";
    } else {
      box.style.backgroundColor = "rgb(125, 135, 150)";
    }
  });
}
fillColorBox();
