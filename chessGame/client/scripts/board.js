import { arrayInfoPieces, colorPiece } from "../untils/untils.js";
import handlerMove from "./piece.js";

function getNamePiece(string) {
    const regexFindNamePiece = /^(white|black)(\D+)(\d)?$/;
    const pieceName = string.split(regexFindNamePiece)[2].toLowerCase();
    return pieceName;
}

function getColorPiece(string) {
    const pieceColor = string.substring(0, 5);
    return pieceColor;
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
    pieces.forEach((_piece) => {
        _piece.addEventListener("click", () => {
            const piece = _piece.id;
            const currentPosition = {
                x: _piece.parentNode.id[0],
                y: _piece.parentNode.id[1],
            };
            removeHighlight();
            highlightCurrentPosition(_piece.parentNode.id);
            handleShowValidMove(piece, currentPosition);
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

function removeHighlight() {
    const points = document.querySelectorAll(".point");
    points.forEach((point) => point.remove());
    const bigPoints = document.querySelectorAll(".bigPoint");
    bigPoints.forEach((bigPoint) => bigPoint.remove());
    const highlightSquare = document.querySelector(".highlightSquare");
    if (highlightSquare) {
        highlightSquare.classList.remove("highlightSquare");
    }
}

function findValidMoveForKnight(colorPiece, currentPosition) {
    const x = (currentPosition.x *= 1);
    const y = (currentPosition.y *= 1);
    const validMove = [];
    let collectMove = [
        {
            x: x + 2,
            y: y - 1,
        },
        {
            x: x + 2,
            y: y + 1,
        },
        {
            x: x + 1,
            y: y + 2,
        },
        {
            x: x - 1,
            y: y + 2,
        },
        {
            x: x - 2,
            y: y + 1,
        },
        {
            x: x - 2,
            y: y - 1,
        },
        {
            x: x - 1,
            y: y - 2,
        },
        {
            x: x + 1,
            y: y - 2,
        },
    ];

    collectMove.map((step) => {
        if (step.x > 0 && step.x < 9 && step.y > 0 && step.y < 9) {
            if (!checkFriendlyPiece(colorPiece, `${step.x}${step.y}`)) {
                validMove.push(`${step.x}${step.y}`);
            }
        }
    });

    return validMove;
}

function findCollectMoveForKing(currentPosition) {
    let collectMove = [];
    for (let dx = -1; dx < 2; ++dx) {
        for (let dy = -1; dy < 2; ++dy) {
            const x = currentPosition.x * 1 + dx;
            const y = currentPosition.y * 1 + dy;
            if (x != currentPosition.x || y != currentPosition.y) {
                if (x > 0 && x < 9 && y > 0 && y < 9) {
                    collectMove.push([`${x}${y}`]);
                }
            }
        }
    }
    return collectMove;
}

function findCollectMoveForQueen(currentPosition) {
    const collectMove = [
        handlerMove.handleMoveTopPiece(currentPosition),
        handlerMove.handleMoveTopRightPiece(currentPosition),
        handlerMove.handleMoveRightPiece(currentPosition),
        handlerMove.handleMoveBottomRightPiece(currentPosition),
        handlerMove.handleMoveBottomPiece(currentPosition),
        handlerMove.handleMoveBottomLeftPiece(currentPosition),
        handlerMove.handleMoveLeftPiece(currentPosition),
        handlerMove.handleMoveTopLeftPiece(currentPosition),
    ];
    return collectMove;
}

function findCollectMoveForBishop(currentPosition) {
    const collectMove = [
        handlerMove.handleMoveTopRightPiece(currentPosition),
        handlerMove.handleMoveBottomRightPiece(currentPosition),
        handlerMove.handleMoveBottomLeftPiece(currentPosition),
        handlerMove.handleMoveTopLeftPiece(currentPosition),
    ];
    return collectMove;
}

function findCollectMoveForRock(currentPosition) {
    const collectMove = [
        handlerMove.handleMoveTopPiece(currentPosition),
        handlerMove.handleMoveRightPiece(currentPosition),
        handlerMove.handleMoveBottomPiece(currentPosition),
        handlerMove.handleMoveLeftPiece(currentPosition),
    ];

    return collectMove;
}

function findValidMove(pieceColor, _collectMove) {
    const collectMove = JSON.parse(JSON.stringify(_collectMove));
    const validMove = [];

    collectMove.forEach((direction) => {
        let targetStep = -1;
        direction.every((step, index) => {
            if (checkFriendlyPiece(pieceColor, step)) {
                targetStep = index;
                return false;
            }
            return true;
        });
        if (targetStep !== -1) {
            const _validMove = direction.splice(0, targetStep);
            if (_validMove) {
                validMove.push(..._validMove);
            }
        } else {
            if (direction.length) {
                validMove.push(...direction);
            }
        }
    });
    return validMove;
}

function checkFriendlyPiece(color, idPosition) {
    const square = document.getElementById(idPosition);
    if (square.innerHTML) {
        const pieceColor = getColorPiece(square.children[0].id);
        return pieceColor === color ? true : false;
    }
    return false;
}

function handleShowValidMove(piece, currentPosition) {
    const namePiece = getNamePiece(piece);
    const colorPiece = getColorPiece(piece);
    console.log(namePiece, "pick", currentPosition);
    switch (namePiece) {
        case "pawn":
            return [11, 22];
        case "rock":
            const collectMoveOfRock = findCollectMoveForRock(currentPosition);
            const validMoveOfRock = findValidMove(
                colorPiece,
                collectMoveOfRock
            );
            showValidMove(validMoveOfRock);
            break;
        case "knight":
            const validMoveOfKnight = findValidMoveForKnight(
                colorPiece,
                currentPosition
            );
            showValidMove(validMoveOfKnight);
            break;
        case "bishop":
            const collectMoveOfBishop =
                findCollectMoveForBishop(currentPosition);
            const validMoveOfBishop = findValidMove(
                colorPiece,
                collectMoveOfBishop
            );
            showValidMove(validMoveOfBishop);
            break;
        case "queen":
            const collectMoveOfQueen = findCollectMoveForQueen(currentPosition);
            const validMoveOfQueen = findValidMove(
                colorPiece,
                collectMoveOfQueen
            );
            showValidMove(validMoveOfQueen);
            break;
        case "king":
            const collectMoveOfKing = findCollectMoveForKing(currentPosition);
            const validMoveOfKing = findValidMove(
                colorPiece,
                collectMoveOfKing
            );
            showValidMove(validMoveOfKing);
            break;
        default:
            return [];
    }
}

function showValidMove(collectMove) {
    collectMove.forEach((step) => {
        const square = document.getElementById(step);
        const point = document.createElement("div");
        if (square.innerHTML) {
            point.classList.add("bigPoint");
            square.appendChild(point);
            point.onclick = () => {
                console.log("click Big");
                handleCapture();
            };
        } else {
            point.classList.add("point");
            square.appendChild(point);
            point.onclick = () => {
                console.log("click");
            };
        }
    });

    // collectMove.forEach((direction) => {
    //     direction.forEach((step) => {
    //         const square = document.getElementById(step);
    //         const point = document.createElement("div");
    //         point.classList.add("point");
    //         square.appendChild(point);
    //         point.onclick = () => {
    //             console.log("click");
    //         };
    //     });
    // });
}
function handleCapture() {
    console.log("capture");
}

function removePieceInOldPosition() {}

function renderPieceInNewPosition() {}

function initial() {
    renderBoardGame();
    renderPiece();
    addEventForPiece();
}
initial();
