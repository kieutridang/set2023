import { arrayInfoPieces, rankPiece } from "../untils/untils.js";
import handlerMove from "./piece.js";
let whiteTurn = true;

function getRankPiece(string) {
    const regexFindRankPiece = /^(white|black)(\D+)(\d)?$/;
    const rankPiece = string.split(regexFindRankPiece)[2].toLowerCase();
    return rankPiece;
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
            square.addEventListener("click", (event) => {
                removeHighlight();
            });
            square.classList.add(
                "square",
                (row + col) % 2 === 0 ? "whiteSquare" : "blackSquare"
            );
            square.setAttribute("id", `${col}${row}`);
            chessBoard.appendChild(square);
        }
    }
}

function renderPieces() {
    arrayInfoPieces.forEach((colorPiece) => {
        colorPiece.forEach((piece) => {
            renderPiece(piece.name, `${piece.x}${piece.y}`);
        });
    });
}

function renderPiece(idPiece, idPosition) {
    const square = document.getElementById(idPosition);
    square.appendChild(createPiece(idPiece));
}

function createPiece(idPiece) {
    const color = getColorPiece(idPiece);
    const rank = getRankPiece(idPiece);
    const piece = document.createElement("img");
    piece.src = `../assets/images/pieces/${color}-${rank}.svg`;
    piece.className = `piece ${color}Piece`;
    piece.id = idPiece;
    piece.alt = idPiece;
    piece.addEventListener("click", (event) => {
        event.stopPropagation();
        const currentPosition = {
            x: piece.parentNode.id[0],
            y: piece.parentNode.id[1],
        };
        removeHighlight();
        highlightCurrentPosition(piece.parentNode.id);
        handleShowValidMove(idPiece, currentPosition);
        // handleMove(idPiece, currentPosition);
    });
    return piece;
}

function highlightCurrentPosition(id) {
    document.getElementById(id).classList.add("highlightSquare");
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
    let collectMove = JSON.parse(JSON.stringify(_collectMove));
    const validMove = [];
    //Remove position have friendly piece
    collectMove = collectMove.map((direction) => {
        let flagCanMove = true;
        return direction.filter((step) => {
            if (checkFriendlyPiece(pieceColor, step)) {
                flagCanMove = false;
                return false;
            }
            return flagCanMove;
        });
    });
    //Remove position is cover by enemy piece
    collectMove = collectMove.map((direction) => {
        let flagCanMove = true;
        const validDirection = direction.filter((step) => {
            if (flagCanMove) {
                if (checkEnemyPiece(pieceColor, step)) {
                    flagCanMove = false;
                    return true;
                }
            }
            return flagCanMove;
        });
        validMove.push(...validDirection);
    });
    return validMove;
}

function checkFriendlyPiece(color, idPosition) {
    const square = document.getElementById(idPosition);
    if (square.innerHTML) {
        const pieceColor = getColorPiece(square.children[0].id);
        return pieceColor === color;
    }
    return false;
}

function checkEnemyPiece(color, idPosition) {
    const square = document.getElementById(idPosition);
    if (square.innerHTML) {
        const pieceColor = getColorPiece(square.children[0].id);
        return pieceColor !== color;
    }
    return false;
}

function handleShowValidMove(idPiece, currentPosition) {
    const _rankPiece = getRankPiece(idPiece);
    const colorPiece = getColorPiece(idPiece);
    console.log(_rankPiece, "pick", currentPosition);
    switch (_rankPiece) {
        case rankPiece.PAWN:
            return [11, 22];
        case "rock":
            const collectMoveOfRock = findCollectMoveForRock(currentPosition);
            const validMoveOfRock = findValidMove(
                colorPiece,
                collectMoveOfRock
            );
            showValidMove(idPiece, validMoveOfRock);
            break;
        case rankPiece.KNIGHT:
            const validMoveOfKnight = findValidMoveForKnight(
                colorPiece,
                currentPosition
            );
            showValidMove(idPiece, validMoveOfKnight);
            break;
        case rankPiece.BISHOP:
            const collectMoveOfBishop =
                findCollectMoveForBishop(currentPosition);
            const validMoveOfBishop = findValidMove(
                colorPiece,
                collectMoveOfBishop
            );
            showValidMove(idPiece, validMoveOfBishop);
            break;
        case rankPiece.QUEEN:
            const collectMoveOfQueen = findCollectMoveForQueen(currentPosition);
            const validMoveOfQueen = findValidMove(
                colorPiece,
                collectMoveOfQueen
            );
            showValidMove(idPiece, validMoveOfQueen);
            break;
        case rankPiece.KING:
            const collectMoveOfKing = findCollectMoveForKing(currentPosition);
            const validMoveOfKing = findValidMove(
                colorPiece,
                collectMoveOfKing
            );
            showValidMove(idPiece, validMoveOfKing);
            break;
        default:
            return [];
    }
}

function showValidMove(idPiece, validMove) {
    validMove.forEach((step) => {
        const square = document.getElementById(step);
        const point = document.createElement("div");
        if (square.innerHTML) {
            point.classList.add("bigPoint");
            square.appendChild(point);
            point.onclick = () => {
                deletePiece(idPiece);
                point.previousElementSibling.remove();
                removeHighlight();
                renderPieceInNewPosition(idPiece, step);
                switchPlayer();
            };
        } else {
            point.classList.add("point");
            square.appendChild(point);
            point.onclick = () => {
                deletePiece(idPiece);
                removeHighlight();
                renderPieceInNewPosition(idPiece, step);
                switchPlayer();
            };
        }
    });
}

function deletePiece(idPiece) {
    const piece = document.getElementById(idPiece);
    piece.remove();
}

function renderPieceInNewPosition(idPiece, idPosition) {
    const square = document.getElementById(idPosition);
    square.appendChild(createPiece(idPiece));
}

function switchPlayer() {
    whiteTurn = !whiteTurn;
    allowMove();
}

function allowMove() {
    const whitePieces = document.querySelectorAll(".whitePiece");
    const blackPieces = document.querySelectorAll(".blackPiece");
    if (whiteTurn) {
        whitePieces.forEach((piece) => {
            piece.style.pointerEvents = "auto";
        });
        blackPieces.forEach((piece) => {
            piece.style.pointerEvents = "none";
        });
    } else {
        whitePieces.forEach((piece) => {
            piece.style.pointerEvents = "none";
        });
        blackPieces.forEach((piece) => {
            piece.style.pointerEvents = "auto";
        });
    }
}

function initial() {
    renderBoardGame();
    renderPieces();
    allowMove();
}

initial();
