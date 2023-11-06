import { arrInfoPieces, colorPiece } from "../untils/untils.js";

function renderBoardGame() {
    const chessBoard = document.getElementById("chessBoard");

    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            const square = document.createElement("div");
            square.classList.add(
                "square",
                (row + col) % 2 === 0 ? "whiteSquare" : "blackSquare"
            );
            square.setAttribute("id", `${col}${row}`);
            chessBoard.appendChild(square);
        }
    }
}

function renderTextBoardGame() {
    let counter = 8;
    for (let row = 1; row < 9; row++) {
        const numberIndex = document.getElementById(`${1}${row}`);

        row % 2 === 0
            ? (numberIndex.innerHTML += `<span class="whiteNumber">${counter--}</span>`)
            : (numberIndex.innerHTML += `<span class="blackNumber">${counter--}</span>`);
    }

    const bufferText = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let col = 1; col < 9; col++) {
        const textIndex = document.getElementById(`${col}${8}`);

        if (col === 1) {
            textIndex.innerHTML += `<span class="whiteText">${
                bufferText[col - 1]
            }</span>`;
            continue;
        }

        col % 2 === 0
            ? (textIndex.innerHTML += `<span class="blackText">${
                  bufferText[col - 1]
              }</span>`)
            : (textIndex.innerHTML += `<span class="whiteText">${
                  bufferText[col - 1]
              }</span>`);
    }
}

function renderPiece() {
    for (let i = 0; i < 2; i++) {
        for (let index = 0; index < arrInfoPieces[i].length; index++) {
            const square = document.getElementById(
                `${arrInfoPieces[i][index].x}${arrInfoPieces[i][index].y}`
            );
            square.innerHTML += `<img class="piece" id="${arrInfoPieces[i][index].name}" src="../assets/images/pieces/${arrInfoPieces[i][index].color}-${arrInfoPieces[i][index].rank}.svg">`;
        }
    }
}

function highlightCurrentPosition(id) {
    document.getElementById(id).classList.add("highlightSquare");
}

function highlightPositionCanMove(id) {
    console.log(id);
    const square = document.getElementById(id);
    const point = document.createElement("div");
    point.classList.add("point");
    square.appendChild(point);
}
function highlightPositionCanCapture(id) {
    console.log(id);
    const square = document.getElementById(id);
    const point = document.createElement("div");
    point.classList.add("bigPoint");
    square.appendChild(point);
}

renderBoardGame();
// renderTextBoardGame();
renderPiece();

function renderShowValidMove(currentPosition, targetPosition) {
    for (let index = 0; index < targetPosition.xTarget.length; index++) {
        console.log(
            "targetPosition.xTarget[index]",
            targetPosition.xTarget[index]
        );
        console.log("currentPosition.x", currentPosition.x);

        if (currentPosition.x > targetPosition.xTarget[index]) {
            for (
                let i = targetPosition.xTarget[index];
                i < currentPosition.x;
                i++
            ) {
                highlightPositionCanMove(`${i}${currentPosition.y}`);
            }
        } else {
            for (
                let i = currentPosition.x + 1;
                i <= targetPosition.xTarget[index];
                i++
            ) {
                highlightPositionCanMove(`${i}${currentPosition.y}`);
            }
        }
    }
}

function handleShowValidMove(currentPosition) {
    // {x: 3, y: 3}
    let xTarget = [];
    let yTarget = [];

    if (currentPosition.x > 1 && currentPosition.y > 1) {
        xTarget.push(1, 8);
        yTarget.push(1, 8);
    }
    renderShowValidMove(currentPosition, { xTarget, yTarget });

    return { xTarget, yTarget };
}

// handleShowValidMove({ x: 3, y: 3 });

function findPositionCanMove(pieceName, currentPosition) {
    switch (pieceName) {
        case "pawn":
            return [11, 22];
        case "rock":
            return [33, 44];
        case "knight":
            return [55, 66];
        case "bishop":
            return [77, 88];
        case "queen":
            return [12, 21];
        case "king":
            return [55];

        default:
            return [55];
    }
}

function showValidMove(arrayPostion) {
    arrayPostion.forEach((position) => {
        highlightPositionCanMove(position);
    });
}

const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
    square.addEventListener("click", (event) => {
        if (!square.children[0]?.id) return;
        const currentPosition = square.id;
        const pieceName = square.children[0].id;
        highlightCurrentPosition(currentPosition);
        const arrayPositionCanMove = findPositionCanMove(
            pieceName,
            currentPosition
        );
        showValidMove(arrayPositionCanMove);
    });
});
