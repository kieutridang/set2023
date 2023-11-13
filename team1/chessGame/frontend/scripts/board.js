// create HTML case
const content = document.getElementById("content");
const chessboard = document.createElement("div");
chessboard.className = "chessboard";

// chess board
content.appendChild(chessboard);

// pieceTypes
const pieceTypes = {
    "Pawn-black": '<i class="fa-regular fa-chess-pawn pieces black-pieces"></i>',
    "Pawn-white": '<i class="fa-regular fa-chess-pawn pieces white-pieces"></i>',
    "Rook-black": '<i class="fa-regular fa-chess-rook pieces black-pieces"></i>',
    "Rook-white": '<i class="fa-regular fa-chess-rook pieces white-pieces"></i>',
    "Knight-black": '<i class="fa-regular fa-chess-knight pieces black-pieces"></i>',
    "Knight-white": '<i class="fa-regular fa-chess-knight pieces white-pieces"></i>',
    "Bishop-black": '<i class="fa-regular fa-chess-bishop pieces black-pieces"></i>',
    "Bishop-white": '<i class="fa-regular fa-chess-bishop pieces white-pieces"></i>',
    "Queen-black": '<i class="fa-regular fa-chess-queen pieces black-pieces"></i>',
    "Queen-white": '<i class="fa-regular fa-chess-queen pieces white-pieces"></i>',
    "King-black": '<i class="fa-regular fa-chess-king pieces black-pieces"></i>',
    "King-white": '<i class="fa-regular fa-chess-king pieces white-pieces"></i>',
};

// generate a block
function generateBlock(x, y, piece) {
    // Create a new block
    const newBlock = document.createElement("div");
    newBlock.className = "chessboard__block";

    for (const pieceType in pieceTypes) {
        if (piece === pieceType) {
            newBlock.innerHTML = pieceTypes[piece];
        }
    }

    newBlock.setAttribute("data-x", x);
    newBlock.setAttribute("data-y", y);
    const order = x * 8 + y;

    if ((parseInt(order) + 1) % 8 === 0) {
        const p = document.createElement("p");
        if ((9 - Math.floor((parseInt(order) + 1) / 8)) % 2 == 0) {
            p.className = "order-block-width even";
        } else {
            p.className = "order-block-width odd";
        }
        p.textContent = 9 - Math.floor((parseInt(order) + 1) / 8);

        newBlock.appendChild(p);
    }

    if (parseInt(order) + 1 > 56) {
        const p = document.createElement("p");
        if ((parseInt(order) + 1) % 2 == 0) {
            p.className = "order-block-height odd";
        } else {
            p.className = "order-block-height even";
        }
        p.textContent = String.fromCharCode(97 + (parseInt(order) % 8));

        newBlock.appendChild(p);
    }

    chessboard.appendChild(newBlock);
}


function renderChessBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const index = i * 8 + j;
            const piece = board[i][j];

            generateBlock(i, j, piece);
        }
    }
}

const board = [
    [
        "Rook-black", null, null, null, "King-black", null, null, "Rook-black",
    ],
    ["Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", ],
    ["Rook-white", "Knight-white", "Pawn-white", "Queen-white", "King-white", null, null, "Rook-white"],
];

//render board
renderChessBoard(board);


let isWhiteTurn = true;

chessboard.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("pieces")) {
        if ((isWhiteTurn && e.target.classList.contains("white-pieces")) || (!isWhiteTurn && e.target.classList.contains("black-pieces"))) {
            localStorage.setItem("coordinate", JSON.stringify([e.target.parentElement.dataset.x, e.target.parentElement.dataset.y]))
            showValidateMove(e.target);
        }

        if (e.target.parentElement.classList.contains("valid-move")) {
            movePiece(e.target.parentElement);
            isWhiteTurn = !isWhiteTurn;
        }
    }

    if (e.target.classList.contains("chessboard__block")) {
        if (e.target.classList.contains("valid-move")) {
            movePiece(e.target);
            isWhiteTurn = !isWhiteTurn;
        }
    }
});

function showValidateMove(piece) {
    //remove valid-move and current-position
    const blocks = document.querySelectorAll(".chessboard__block.valid-move");
    blocks.forEach((block) => block.classList.remove("valid-move"));

    const currentPositionBlocks = document.querySelectorAll(
        ".chessboard__block.current-position"
    );
    currentPositionBlocks.forEach((block) =>
        block.classList.remove("current-position")
    );

    //remove pick
    const pick = document.querySelectorAll(".pieces.pick");
    pick.forEach((pick) => pick.classList.remove("pick"));

    //handle các trường hợp đặc biệt

    //pawn
    if (piece.classList.contains("fa-chess-pawn")) {
        const currentPositionX = parseInt(piece.parentElement.dataset.x);
        const currentPositionY = parseInt(piece.parentElement.dataset.y);
        piece.classList.add("pick");

        const isBlack = piece.classList.contains("black-pieces") ? true : false;

        const direction = isBlack ? 1 : -1;

        for (let dy = -1; dy <= 1; dy += 2) {
            let newX = currentPositionX + direction;
            let newY = currentPositionY + dy;
            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && board[newX][newY] != null) {
                const diagonalBlock = document.querySelector(`.chessboard__block[data-x='${newX}'][data-y='${newY}']`);
                diagonalBlock.classList.add("valid-move");
            }
        }

        let newX = currentPositionX + direction;
        if (newX >= 0 && newX < 8 && board[newX][currentPositionY] === null) {
            const forwardBlock = document.querySelector(`.chessboard__block[data-x='${newX}'][data-y='${currentPositionY}']`);
            forwardBlock.classList.add("valid-move");
        }

        if ((isBlack && currentPositionX === 1) || (!isBlack && currentPositionX === 6)) {
            newX = currentPositionX + 2 * direction;
            if (newX >= 0 && newX < 8 && board[newX][currentPositionY] === null) {
                const doubleForwardBlock = document.querySelector(`.chessboard__block[data-x='${newX}'][data-y='${currentPositionY}']`);
                doubleForwardBlock.classList.add("valid-move");
            }
        }
    }


    //knight
    if (piece.classList.contains("fa-chess-knight")) {
        const currentPositionX = parseInt(piece.parentElement.dataset.x);
        const currentPositionY = parseInt(piece.parentElement.dataset.y);
        piece.classList.add("pick");

        const moves = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
        ];

        const isBlack = piece.classList.contains("black-pieces") ? true : false;

        moves.forEach(([dx, dy]) => {
            let validX = currentPositionX + dx;
            let validY = currentPositionY + dy;
            let block = document.querySelector(
                `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
            );

            if (block && isBlack) {
                if (
                    board[validX][validY] === null ||
                    board[validX][validY].includes("white")
                ) {
                    block.classList.add("valid-move");
                }
            } else if (block && !isBlack) {
                if (
                    board[validX][validY] === null ||
                    board[validX][validY].includes("black")
                ) {
                    block.classList.add("valid-move");
                }
            }
        });
    }


    //rook
    if (piece.classList.contains("fa-chess-rook")) {
        const currentPositionX = parseInt(piece.parentElement.dataset.x);
        const currentPositionY = parseInt(piece.parentElement.dataset.y);
        piece.classList.add("pick");

        const moves = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        const isBlack = piece.classList.contains("black-pieces") ? true : false;

        moves.forEach(([dx, dy]) => {
            let validX = currentPositionX + dx;
            let validY = currentPositionY + dy;
            let block = document.querySelector(
                `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
            );
            let hasCaptured = false;

            while (block) {
                if (isBlack) {
                    if (board[validX][validY] === null) {
                        block.classList.add("valid-move");
                    } else if (board[validX][validY].includes("white")) {
                        block.classList.add("valid-move");
                        break;
                    } else {
                        break;
                    }
                } else {
                    if (
                        board[validX][validY] === null ||
                        (board[validX][validY].includes("black") && !hasCaptured)
                    ) {
                        block.classList.add("valid-move");
                        if (board[validX][validY] !== null) hasCaptured = true;
                    } else {
                        break;
                    }
                }

                validX += dx;
                validY += dy;
                block = document.querySelector(
                    `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
                );
            }
        });
    }


    //bishop
    if (piece.classList.contains("fa-chess-bishop")) {
        const currentPositionX = parseInt(piece.parentElement.dataset.x);
        const currentPositionY = parseInt(piece.parentElement.dataset.y);
        piece.classList.add("pick");

        const moves = [
            [1, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
        ];

        const isBlack = piece.classList.contains("black-pieces") ? true : false;

        moves.forEach(([dx, dy]) => {
            let validX = currentPositionX + dx;
            let validY = currentPositionY + dy;
            let block = document.querySelector(
                `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
            );
            let hasCaptured = false;

            while (block) {
                if (isBlack) {
                    if (board[validX][validY] === null) {
                        block.classList.add("valid-move");
                    } else if (board[validX][validY].includes("white")) {
                        block.classList.add("valid-move");
                        break;
                    } else {
                        break;
                    }
                } else {
                    if (
                        board[validX][validY] === null ||
                        (board[validX][validY].includes("black") && !hasCaptured)
                    ) {
                        block.classList.add("valid-move");
                        if (board[validX][validY] !== null) hasCaptured = true;
                    } else {
                        break;
                    }
                }

                validX += dx;
                validY += dy;
                block = document.querySelector(
                    `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
                );
            }
        });
    }


    //queen
    if (piece.classList.contains("fa-chess-queen")) {
        const currentPositionX = parseInt(piece.parentElement.dataset.x);
        const currentPositionY = parseInt(piece.parentElement.dataset.y);
        piece.classList.add("pick");

        const moves = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        const isBlack = piece.classList.contains("black-pieces") ? true : false;

        moves.forEach(([dx, dy]) => {
            let validX = currentPositionX + dx;
            let validY = currentPositionY + dy;
            let block = document.querySelector(
                `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
            );
            let hasCaptured = false;

            while (block) {
                if (isBlack) {
                    if (board[validX][validY] === null) {
                        block.classList.add("valid-move");
                    } else if (board[validX][validY].includes("white")) {
                        block.classList.add("valid-move");
                        break;
                    } else {
                        break;
                    }
                } else {
                    if (
                        board[validX][validY] === null ||
                        (board[validX][validY].includes("black") && !hasCaptured)
                    ) {
                        block.classList.add("valid-move");
                        if (board[validX][validY] !== null) hasCaptured = true;
                    } else {
                        break;
                    }
                }

                validX += dx;
                validY += dy;
                block = document.querySelector(
                    `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
                );
            }
        });
    }


    //king
    if (piece.classList.contains("fa-chess-king")) {
        const currentPositionX = parseInt(piece.parentElement.dataset.x);
        const currentPositionY = parseInt(piece.parentElement.dataset.y);
        piece.classList.add("pick");

        const moves = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        const isBlack = piece.classList.contains("black-pieces") ? true : false;

        moves.forEach(([dx, dy]) => {
            let validX = currentPositionX + dx;
            let validY = currentPositionY + dy;
            let block = document.querySelector(
                `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
            );

            if (block) {
                if (isBlack) {
                    if (board[validX][validY] === null || board[validX][validY].includes("white")) {
                        block.classList.add("valid-move");
                    }
                } else {
                    if (board[validX][validY] === null || board[validX][validY].includes("black")) {
                        block.classList.add("valid-move");
                    }
                }
            }
        });

        //castling
        if (isBlack) {
            if (board[0][4] === "King-black") {
                if (board[0][5] === null && board[0][6] === null) {
                    let block = document.querySelector(
                        `.chessboard__block[data-x='0'][data-y='6']`
                    );
                    block.classList.add("valid-move");
                }

                if (board[0][3] === null && board[0][2] === null && board[0][1] === null) {
                    let block = document.querySelector(
                        `.chessboard__block[data-x='0'][data-y='2']`
                    );
                    block.classList.add("valid-move");
                }
            }
        } else {
            if (board[7][4] === "King-white") {
                if (board[7][5] === null && board[7][6] === null) {
                    const block1 = document.querySelector(
                        `.chessboard__block[data-x='7'][data-y='6']`
                    );
                    block1.classList.add("valid-move");
                }

                if (board[7][3] === null && board[7][2] === null && board[7][1] === null) {
                    const block2 = document.querySelector(
                        `.chessboard__block[data-x='7'][data-y='2']`
                    );
                    block2.classList.add("valid-move");
                }
            }
        }
    }

}


function movePiece(block) {
    const currentPositionX = JSON.parse(localStorage.getItem("coordinate"))[0];
    const currentPositionY = JSON.parse(localStorage.getItem("coordinate"))[1];
    const positionX = parseInt(block.dataset.x);
    const positionY = parseInt(block.dataset.y);

    //move piece
    board[positionX][positionY] = board[currentPositionX][currentPositionY]
    board[currentPositionX][currentPositionY] = null;

    //castling
    if (positionX == 7 && positionY == 2 && board[7][2] == "King-white") {
        if (board[7][1] == null && board[7][3] == null) {
            board[7][3] = "Rook-white";
            board[7][0] = null;
        }
    }

    if (positionX == 7 && positionY == 6 && board[7][6] == "King-white") {
        if (board[7][5] == null) {
            board[7][5] = "Rook-white";
            board[7][7] = null;
        }

    }

    if (positionX == 0 && positionY == 2) {
        if (board[0][1] == null && board[0][3] == null && board[0][2] == "King-black") {
            board[0][3] = "Rook-black";
            board[0][0] = null;
        }
    }

    if (positionX == 0 && positionY == 6 && board[0][6] == "King-black") {
        if (board[0][5] == null) {
            board[0][5] = "Rook-black";
            board[0][7] = null;
        }

    }


    //render board
    chessboard.innerHTML = ""
    renderChessBoard(board);


    if (isCheckKing(board, positionX, positionY)) {
        const currentPiece = board[positionX][positionY];
        const isCurrentPieceBlack = currentPiece.includes("black");
        const oppositeKing = isCurrentPieceBlack ? "King-white" : "King-black";

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] != null) {
                    if (board[i][j] == oppositeKing) {
                        const block = document.querySelector(
                            `.chessboard__block[data-x='${i}'][data-y='${j}']`
                        );
                        block.classList.add("check");
                    }
                }
            }
        }
    }

}




function isCheckKing(board, positionX, positionY) {
    const piece = board[positionX][positionY];
    // const isBlack = piece.includes("black");


    //pawn
    if (piece) {
        if (piece.includes("Pawn")) {
            const isBlack = piece.includes("black");
            const direction = isBlack ? 1 : -1;

            for (let dy = -1; dy <= 1; dy += 2) {
                let newX = positionX + direction;
                let newY = positionY + dy;
                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && board[newX][newY] != null) {
                    if (board[newX][newY].includes("King")) {
                        return true;
                    } else false;
                }
            }
        }
    }


    //knight
    if (piece) {
        if (piece.includes("Knight")) {
            const moves = [
                [2, 1],
                [2, -1],
                [-2, 1],
                [-2, -1],
                [1, 2],
                [1, -2],
                [-1, 2],
                [-1, -2],
            ];

            for (let i = 0; i < moves.length; i++) {
                let [dx, dy] = moves[i];
                let validX = positionX + dx;
                let validY = positionY + dy;
                if (validX >= 0 && validX < 8 && validY >= 0 && validY < 8 && board[validX][validY] != null) {
                    if (board[validX][validY].split("-")[0] == "King") {
                        return true;
                    }
                }
            }
        }
    }

    //rook
    if (piece) {
        if (piece.includes("Rook")) {
            const moves = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
            ];

            for (let i = 0; i < moves.length; i++) {
                let [dx, dy] = moves[i];
                let validX = positionX + dx;
                let validY = positionY + dy;

                while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
                    if (board[validX][validY] != null) {
                        const targetPiece = board[validX][validY].split("-")[0];
                        if (targetPiece == "King") {
                            return true;
                        }
                        break;
                    }
                    validX += dx;
                    validY += dy;
                }
            }
        }
    }

    //bishop
    if (piece) {
        if (piece.includes("Bishop")) {
            const moves = [
                [1, 1],
                [-1, -1],
                [1, -1],
                [-1, 1],
            ];

            for (let i = 0; i < moves.length; i++) {
                let [dx, dy] = moves[i];
                let validX = positionX + dx;
                let validY = positionY + dy;

                while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
                    if (board[validX][validY] != null) {
                        const targetPiece = board[validX][validY].split("-")[0];
                        if (targetPiece == "King") {
                            return true;
                        }
                        break;
                    }
                    validX += dx;
                    validY += dy;
                }
            }
        }
    }

    //queen
    if (piece) {
        if (piece.includes("Queen")) {
            const moves = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1],
            ];

            for (let i = 0; i < moves.length; i++) {
                let [dx, dy] = moves[i];
                let validX = positionX + dx;
                let validY = positionY + dy;

                while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
                    if (board[validX][validY] != null) {
                        const targetPiece = board[validX][validY].split("-")[0];
                        if (targetPiece == "King") {
                            return true;
                        }
                        break;
                    }
                    validX += dx;
                    validY += dy;
                }
            }
        }
    }

    //king
    if (piece) {
        if (piece.includes("King")) {
            const moves = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1],
            ];

            for (let i = 0; i < moves.length; i++) {
                let [dx, dy] = moves[i];
                let validX = positionX + dx;
                let validY = positionY + dy;

                while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
                    if (board[validX][validY] != null) {
                        const targetPiece = board[validX][validY].split("-")[0];
                        if (targetPiece == "King") {
                            return true;
                        }
                        break;
                    }
                    validX += dx;
                    validY += dy;
                }
            }
        }
    }
    return false;







}


//content
content.appendChild(chessboard);