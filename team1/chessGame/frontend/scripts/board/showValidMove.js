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