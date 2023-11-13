import { arrayInfoPieces, colorPiece } from "../untils/untils.js";

function getPieceName(string) {
    const regexFindNamePiece = /^(white|black)(\D+)(\d)?$/;
    const pieceName = string.split(regexFindNamePiece)[2].toLowerCase();
    return pieceName;
}

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
        for (let index = 0; index < arrayInfoPieces[i].length; index++) {
            const square = document.getElementById(
                `${arrayInfoPieces[i][index].x}${arrayInfoPieces[i][index].y}`
            );
            square.innerHTML += `<img class="piece" id="${arrayInfoPieces[i][index].name}" src="../assets/images/pieces/${arrayInfoPieces[i][index].color}-${arrayInfoPieces[i][index].rank}.svg">`;
        }
    }
}

function addEventForPiece() {
    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((piece) => {
        piece.addEventListener("click", () => {
            const pieceName = getPieceName(piece.id);
            const currentPosition = {
                x: piece.parentNode.id[0],
                y: piece.parentNode.id[1],
            };
            console.log(pieceName, currentPosition);
            highlightCurrentPosition(piece.parentNode.id);
            handleShowValidMove(pieceName, currentPosition);
        });
    });
}

function highlightCurrentPosition(id) {
    document.getElementById(id).classList.add("highlightSquare");
}

function highlightPositionValidMove(id) {
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

function handleShowValidMove(pieceName, currentPosition) {
    console.log(pieceName, currentPosition);
    switch (pieceName) {
        case "pawn":
            return [11, 22];
        case "rock":
            showValidMove(findValidMoveForRock(currentPosition));
            break;
        case "knight":
            return [55, 66];
        case "bishop":
            showValidMove(findValidMoveForBishop(currentPosition));
            break;
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
        highlightPositionValidMove(position);
    });
}

function handleMoveTopPiece(currentPosition) {
    // currentPosition.y : decrease
    // currentPosition.x : const
    const collectMove = [];

    for (let index = currentPosition.y*1 - 1; index >= 1; index--) {
        collectMove.push(`${currentPosition.x}${index}`);
    }

    return collectMove;
}

function handleMoveRightPiece(currentPosition) {
    // currentPosition.x : increase
    // currentPosition.y : const
    const collectMove = [];

    for (let index = currentPosition.x*1 + 1; index <= 8; index++) {
        collectMove.push(`${index}${currentPosition.y}`);
    }

    return collectMove;
}

function handleMoveBottomPiece(currentPosition) {
    console.log(currentPosition);
    // currentPosition.y : increase
    // currentPosition.x : const
    const collectMove = [];
    let index = currentPosition.y + 1;

    for (let index = currentPosition.y*1 + 1; index <= 8; index++) {
        collectMove.push(`${currentPosition.x}${index}`);
    }

    return collectMove;
}


function handleMoveLeftPiece(currentPosition) {
    // currentPosition.x : decrease
    // currentPosition.y : const
    const collectMove = [];

    for (let index = currentPosition.x*1 - 1; index >= 1; index--) {
        collectMove.push(`${index}${currentPosition.y}`);
    }

    return collectMove;
}

function handleMoveTopRightPiece(currentPosition) {
    // currentPosition.x : increase
    // currentPosition.y : decrease
    const collectMove = [];
    let yTemporary = currentPosition.y*1;

    for (let index = currentPosition.x*1 + 1; index <= 8; index++) {
        collectMove.push(`${index}${--yTemporary}`);
        if (yTemporary === 0) {
            return [];
        }

        if (yTemporary <= 1) {
            break;
        }
    }

    console.log("collectMove", collectMove);

    return collectMove;
}

function handleMoveBottomRightPiece(currentPosition) {
    // currentPosition.x : increase
    // currentPosition.y : increase
    const collectMove = [];
    let yTemporary = currentPosition.y*1;

    for (let index = currentPosition.x*1 + 1; index <= 8; index++) {
        collectMove.push(`${index}${++yTemporary}`);

        if (yTemporary === 9) {
            return [];
        }

        if (yTemporary >= 8) {
            break;
        }
    }

    return collectMove;
}

function handleMoveBottomLeftPiece(currentPosition) {
    // currentPosition.x : decrease
    // currentPosition.y : increase
    const collectMove = [];
    let yTemporary = currentPosition.y*1;

    for (let index = currentPosition.x*1 - 1; index >= 1; index--) {
        collectMove.push(`${index}${++yTemporary}`);

        if (yTemporary === 9) {
            return [];
        }

        if (yTemporary >= 8) {
            break;
        }
    }

    return collectMove;
}

function handleMoveTopLeftPiece(currentPosition) {
    // currentPosition.x : decrease
    // currentPosition.y : decrease
    const collectMove = [];
    let yTemporary = currentPosition.y*1;

    for (let index = currentPosition.x*1 - 1; index >= 1; index--) {
        collectMove.push(`${index}${--yTemporary}`);

        if (yTemporary === 0) {
            return [];
        }

        if (yTemporary <= 1) {
            break;
        }
    }

    return collectMove;
}

function findValidMoveForRock(currentPosition) {
    const collectMove = [
        ...handleMoveTopPiece(currentPosition),
        ...handleMoveBottomPiece(currentPosition),
        ...handleMoveRightPiece(currentPosition),
        ...handleMoveLeftPiece(currentPosition),
    ];
    return collectMove;
}

function findValidMoveForBishop(currentPosition) {
    const collectMove = [
        ...handleMoveTopRightPiece(currentPosition),
        ...handleMoveTopLeftPiece(currentPosition),
        ...handleMoveBottomRightPiece(currentPosition),
        ...handleMoveBottomLeftPiece(currentPosition),
    ];
    console.log(collectMove);
    return collectMove;
}

function initial() {
    renderBoardGame();
    renderPiece();
    addEventForPiece();
}
initial();
