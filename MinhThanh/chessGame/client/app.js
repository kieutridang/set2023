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
    // console.log({
    //   getId,
    //   arr,
    //   aside,
    //   aup,
    //   a,
    // });

    if (a % 2 == 0) {
      box.style.backgroundColor = "rgb(232, 235, 239)";
    } else {
      box.style.backgroundColor = "rgb(125, 135, 150)";
    }
  });
}
fillColorBox();

let tog = 1;
document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    getId = item.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    arr.push("0");
    aup = eval(arr.join(""));
    a = aside + aup;
    function whosTurn(toggle) {
      if (item.innerText == `${toggle}pawn`) {
        item.style.backgroundColor = "blue";

        if (tog % 2 !== 0 && aup < 800) {
          // First move for white pawns
          if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
            document.getElementById(`b${a + 100}`).style.backgroundColor =
              "greenyellow";
            if (
              document.getElementById(`b${a + 200}`).innerText.length == 0 &&
              aup < 300
            ) {
              document.getElementById(`b${a + 200}`).style.backgroundColor =
                "greenyellow";
            }
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }

        if (tog % 2 == 0 && aup > 100) {
          // First move for black pawns
          if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
            document.getElementById(`b${a - 100}`).style.backgroundColor =
              "greenyellow";
            if (
              document.getElementById(`b${a - 200}`).innerText.length == 0 &&
              aup > 600
            ) {
              document.getElementById(`b${a - 200}`).style.backgroundColor =
                "greenyellow";
            }
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
        // Second move for pawns
        if (tog % 2 !== 0 && aup >= 800) {
          if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
            document.getElementById(`b${a + 100}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
        if (tog % 2 == 0 && aup <= 100) {
          if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
            document.getElementById(`b${a - 100}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
      }
    }
    // Toggling the turn

    if (tog % 2 !== 0) {
      document.getElementById("tog").innerText = "White's Turn";
      whosTurn("W");
    }
    if (tog % 2 == 0) {
      document.getElementById("tog").innerText = "Black's Turn";
      whosTurn("B");
    }
  });
});

// Moving the element
document.querySelectorAll(".box").forEach((hathiTest) => {
  hathiTest.addEventListener("click", function () {
    if (hathiTest.style.backgroundColor == "blue") {
      blueId = hathiTest.id;
      blueText = hathiTest.innerText;

      document.querySelectorAll(".box").forEach((hathiTest2) => {
        hathiTest2.addEventListener("click", function () {
          if (
            hathiTest2.style.backgroundColor == "greenyellow" &&
            hathiTest2.innerText.length == 0
          ) {
            document.getElementById(blueId).innerText = "";
            hathiTest2.innerText = blueText;
            coloring();
            insertImage();
          }
        });
      });
    }
  });
});
