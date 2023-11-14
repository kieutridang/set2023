import { arrayInfoPieces, colorPiece } from "../untils/untils.js";

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

function findValidMove(pieceName, currentPosition) {
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
        highlightPositionCanMove(position);
    });
}

function handleMoveTopPiece(currentPosition) {
    // currentPosition.y : decrease
    // currentPosition.x : const
    const collectMove = [];

    for (let index = currentPosition.y - 1; index >= 1; index--) {
        collectMove.push(`${currentPosition.x}${index}`);
    }

    return collectMove;
}

function handleMoveBottomPiece(currentPosition) {
    // currentPosition.y : increase
    // currentPosition.x : const
    const collectMove = [];

    for (let index = currentPosition.y + 1; index <= 8; index++) {
        collectMove.push(`${currentPosition.x}${index}`);
    }

    return collectMove;
}

function handleMoveRightPiece(currentPosition) {
    // currentPosition.x : increase
    // currentPosition.y : const
    const collectMove = [];

    for (let index = currentPosition.x + 1; index <= 8; index++) {
        collectMove.push(`${index}${currentPosition.y}`);
    }

    return collectMove;
}

function handleMoveLeftPiece(currentPosition) {
    // currentPosition.x : decrease
    // currentPosition.y : const
    const collectMove = [];

    for (let index = currentPosition.x - 1; index >= 1; index--) {
        collectMove.push(`${index}${currentPosition.y}`);
    }

    return collectMove;
}

function handleMoveTopRightPiece(currentPosition) {
    // currentPosition.x : increase
    // currentPosition.y : decrease
    const collectMove = [];
    let yTemporary = currentPosition.y;

    for (let index = currentPosition.x + 1; index <= 8; index++) {
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

function handleMoveTopLeftPiece(currentPosition) {
    // currentPosition.x : decrease
    // currentPosition.y : decrease
    const collectMove = [];
    let yTemporary = currentPosition.y;

    for (let index = currentPosition.x - 1; index >= 1; index--) {
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

function handleMoveBottomRightPiece(currentPosition) {
    // currentPosition.x : increase
    // currentPosition.y : increase
    const collectMove = [];
    let yTemporary = currentPosition.y;

    for (let index = currentPosition.x + 1; index <= 8; index++) {
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
    let yTemporary = currentPosition.y;

    for (let index = currentPosition.x - 1; index >= 1; index--) {
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
    return collectMove;
}

function findValidMoveForKing(currentPosition) {
    let collectMove = [];
    for (let dx = -1; dx < 2; ++dx) {
        for (let dy = -1; dy < 2; ++dy) {
            const validX = currentPosition.x + dx;
            const validY = currentPosition.y + dy;
            
            if(validX !== currentPosition.x || validY !== currentPosition.y) {
                if(validX !== 0 && validY !== 0){
                    collectMove.push(`${validX}${validY}`)
                }
            }
        }
    }
    
    return collectMove;
}

function findValidMoveForKnight(currentPosition) {
    let collectMove = [];

    let moves = [
        `${currentPosition.x + 2}${currentPosition.y + 1}`, `${currentPosition.x - 2}${currentPosition.y + 1}`,
        `${currentPosition.x + 2}${currentPosition.y - 1}`, `${currentPosition.x - 2}${currentPosition.y - 1}`,
        `${currentPosition.x + 1}${currentPosition.y + 2}`, `${currentPosition.x - 1}${currentPosition.y + 2}`,
        `${currentPosition.x + 1}${currentPosition.y - 2}`, `${currentPosition.x - 1}${currentPosition.y - 2}`
    ];
      
      for (const move of moves) {
        const x = move[0];
        const y = move[1];
      
        if (x > 0 && y > 0) {
            collectMove.push(move);
        }
      }
    
    return collectMove;
}

function initial() {
    renderBoardGame();
    renderPiece();
    addEventForPiece();
}
initial();
