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

    function checkmate(board) {
        let countBlackKing = 0;
        let countWhiteKing = 0;
        outer: for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] == "King-black") {
                    countBlackKing++;
                }
                if (board[i][j] == "King-white") {
                    countWhiteKing++;
                }
                if (countBlackKing > 0 && countWhiteKing > 0) {
                    break outer;
                }
            }
        }

        if (countBlackKing == 0) {
            const result = document.createElement("p");
            result.innerHTML = "White win";
            result.className = "result";

            const againButton = document.createElement("button");
            againButton.innerHTML = "Play again";
            againButton.className = "again-button";

            againButton.addEventListener("click", () => {
                location.reload();
            });



            content.append(result);
            content.append(againButton);
        }

        if (countWhiteKing == 0) {
            const result = document.createElement("p");
            result.innerHTML = "Black win";
            result.className = "result";

            content.append(result);
        }
    }

    checkmate(board);


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

    const audio = new Audio('../../assets/audio/move.mp3');
    audio.addEventListener('canplaythrough', (event) => {
        audio.play().catch(error => {
            console.log(error);
        });
    });

}