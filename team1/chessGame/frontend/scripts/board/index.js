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

const board = [
    ["Rook-black", "Knight-black", "Bishop-black", "Queen-black", "King-black", "Bishop-black", "Knight-black", "Rook-black"],
    ["Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white"],
    ["Rook-white", "Knight-white", "Bishop-white", "Queen-white", "King-white", "Bishop-white", "Knight-white", "Rook-white"],
];

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