//inserting the images
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

//Coloring the board

function coloring() {
  const color = document.querySelectorAll(".box");

  color.forEach((color) => {
    getId = color.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    aup = eval(arr.shift());
    a = aside + aup;

    if (a % 2 == 0) {
      color.style.backgroundColor = "rgb(232 235 239)";
    }
    if (a % 2 !== 0) {
      color.style.backgroundColor = "rgb(125 135 150)";
    }
  });
}
coloring();

let tog = 1;

document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    // if (
    //   item.style.backgroundColor == "greenyellow" &&
    //   item.innerText.length == 0
    // ) {
    //   console.log("move");
    //   tog = tog + 1;
    // } else if (
    //   item.style.backgroundColor == "greenyellow" &&
    //   item.innerText.length !== 0
    // ) {
    //   document.querySelectorAll(".box").forEach((i) => {
    //     console.log('notmove');
    //     if (i.style.backgroundColor == "blue") {
    //       blueId = i.id;
    //       blueText = i.innerText;

    //       document.getElementById(blueId).innerText = "";
    //       item.innerText = blueText;
    //       coloring();
    //       insertImages();
    //       tog = tog + 1;
    //     }
    //   });
    // }

    getId = item.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    arr.push("0");
    aup = eval(arr.join(""));
    a = aside + aup;
    console.log("col =", aside, "row =", aup / 100);

    //function to display the available paths for all pieces

    function whosTurn(toggle) {
      console.log("tog: ", tog);
      // PAWN

      if (item.innerText == `${toggle}pawn`) {
        item.style.backgroundColor = "blue";

        // if (tog % 2 !== 0 && aup < 800) {
        //   // First move for white pawns
        //   if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
        //     document.getElementById(`b${a + 100}`).style.backgroundColor =
        //       "greenyellow";
        //     if (
        //       document.getElementById(`b${a + 200}`).innerText.length == 0 &&
        //       aup < 300
        //     ) {
        //       document.getElementById(`b${a + 200}`).style.backgroundColor =
        //         "greenyellow";
        //     }
        //   }
        //   if (
        //     aside < 8 &&
        //     document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        //   if (
        //     aside > 1 &&
        //     document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        // }

        // if (tog % 2 == 0 && aup > 100) {
        //   // First move for black pawns
        //   if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
        //     document.getElementById(`b${a - 100}`).style.backgroundColor =
        //       "greenyellow";
        //     if (
        //       document.getElementById(`b${a - 200}`).innerText.length == 0 &&
        //       aup > 600
        //     ) {
        //       document.getElementById(`b${a - 200}`).style.backgroundColor =
        //         "greenyellow";
        //     }
        //   }
        //   if (
        //     aside < 8 &&
        //     document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        //   if (
        //     aside > 1 &&
        //     document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        // }
        // // Second move for pawns
        // if (tog % 2 !== 0 && aup >= 800) {
        //   if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
        //     document.getElementById(`b${a + 100}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        //   if (
        //     aside < 8 &&
        //     document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        //   if (
        //     aside > 1 &&
        //     document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        // }
        // if (tog % 2 == 0 && aup <= 100) {
        //   if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
        //     document.getElementById(`b${a - 100}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        //   if (
        //     aside < 8 &&
        //     document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        //   if (
        //     aside > 1 &&
        //     document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
        //   ) {
        //     document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
        //       "greenyellow";
        //   }
        // }
      }
    }
    if (tog % 2 !== 0) {
      document.getElementById("tog").innerText = "White's Turn";
      whosTurn("white-");
    }
    if (tog % 2 == 0) {
      document.getElementById("tog").innerText = "Black's Turn";
      whosTurn("black-");
    }
  });
});

// Moving the element
document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    if (item.style.backgroundColor == "blue") {
      blueId = item.id;
      blueText = item.innerText;
      console.log({ blueId, blueText });

      document.querySelectorAll(".box").forEach((item2) => {
        item2.addEventListener("click", function () {
          if (
            item2.style.backgroundColor == "greenyellow" &&
            item2.innerText.length == 0
          ) {
            document.getElementById(blueId).innerText = "";
            item2.innerText = blueText;
            coloring();
            insertImages();
          }
        });
      });
    }
  });
});
