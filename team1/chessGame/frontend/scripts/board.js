// create HTML case
const content = document.getElementById('content');
const chessboard = document.createElement('div');
chessboard.className = 'chessboard';


// chess board
content.appendChild(chessboard);



// generate a block
    function generateBlock(x,y, piece) {
        // Create a new block
        const newBlock = document.createElement('div');
        newBlock.className = 'chessboard__block';
    
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
            "King-white": '<i class="fa-regular fa-chess-king pieces white-pieces"></i>'
        };
    
        for (const pieceType in pieceTypes) {
            if (piece === pieceType) {
                newBlock.innerHTML = pieceTypes[piece];
            }
        }

        newBlock.setAttribute('data-x', x);
        newBlock.setAttribute('data-y', y);
 
        if ( (parseInt(newBlock.dataset.x * newBlock.dataset.y) + 1 ) % 8 === 0) {
            const p = document.createElement('p');
            if ((9 - Math.floor((parseInt(newBlock.dataset.x * newBlock.dataset.y) + 1) / 8)) % 2 == 0) {
                p.className = "order-block-width even"
            } else {
                p.className = "order-block-width odd"
            }
            p.textContent = 9 - Math.floor((parseInt(newBlock.dataset.x * newBlock.dataset.y) + 1) / 8);

            newBlock.appendChild(p);
        }

        if ( (parseInt(newBlock.dataset.x * newBlock.dataset.y) + 1 ) > 56) {
            const p = document.createElement('p');
            if ((parseInt(newBlock.dataset.x * newBlock.dataset.y) + 1) % 2 == 0) {
                p.className = "order-block-height odd"
            } else {
                p.className = "order-block-height even"
            }
            p.textContent = String.fromCharCode(97 + parseInt(newBlock.dataset.x * newBlock.dataset.y) % 8);

            newBlock.appendChild(p);
        }

        // Append the new block to the chessboard
        chessboard.appendChild(newBlock);
    }

    function renderChessBoard(board) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const index = i * 8 + j;
                const piece = board[i][j];
    
                generateBlock(i,j, piece);
            }
        }
    }

const board = [
    ["Rook-black", "Knight-black", "Bishop-black", "Queen-black", "King-black", "Bishop-black", "Knight-black", "Rook-black"],
    ["Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black", "Pawn-black"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, "Knight-white", null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Pawn-white", "Knight-white"],
    ["Rook-white", "Knight-white", "Knight-white", "Queen-white", "King-white", "Bishop-white", "Knight-white", "Rook-white"]
];

// Render the chess board
renderChessBoard(board);

chessboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('pieces')) {
        showValidateMove(e.target);
    }

    if (e.target.classList.contains('chessboard__block')) {
        console.log(e.target.dataset.order);
    }
} )


function showValidateMove(piece) {

    //remove valid-move and current-position
    const blocks = document.querySelectorAll('.chessboard__block.valid-move');
    blocks.forEach(block => block.classList.remove('valid-move'));

    const currentPositionBlocks = document.querySelectorAll('.chessboard__block.current-position');
    currentPositionBlocks.forEach(block => block.classList.remove('current-position'));

    //remove pick
    const pick = document.querySelectorAll('.pieces.pick');
    pick.forEach(pick => pick.classList.remove('pick'));


    //handle các trường hợp đặc biệt
    if (piece.classList.contains("fa-chess-pawn") && piece.classList.contains("black-pieces")) {
        const currentPosition = parseInt(piece.parentElement.dataset.order);
        piece.classList.add('pick');

        const oneStepForward = currentPosition + 8;
        const twoStepsForward = currentPosition + 16;

        const currentPositionBlock = document.querySelector(`.chessboard__block[data-order='${currentPosition}']`);
        const blockOneStepForward = document.querySelector(`.chessboard__block[data-order='${oneStepForward}']`);
        const blockTwoStepsForward = document.querySelector(`.chessboard__block[data-order='${twoStepsForward}']`);

        if (currentPositionBlock) {
            currentPositionBlock.classList.add('current-position');
        }

        if (blockOneStepForward) {
            blockOneStepForward.classList.add('valid-move');
        }
        if (blockTwoStepsForward) {
            blockTwoStepsForward.classList.add('valid-move');
        }
    }

    if (piece.classList.contains("fa-chess-pawn") && piece.classList.contains("white-pieces")) {
        const currentPosition = parseInt(piece.parentElement.dataset.order);
        piece.classList.add('pick');

        const oneStepForward = currentPosition - 8;
        const twoStepsForward = currentPosition - 16;

        const currentPositionBlock = document.querySelector(`.chessboard__block[data-order='${currentPosition}']`);
        const blockOneStepForward = document.querySelector(`.chessboard__block[data-order='${oneStepForward}']`);
        const blockTwoStepsForward = document.querySelector(`.chessboard__block[data-order='${twoStepsForward}']`);

        if (currentPositionBlock) {
            currentPositionBlock.classList.add('current-position');
        }

        if (blockOneStepForward) {
            blockOneStepForward.classList.add('valid-move');
        }
        if (blockTwoStepsForward) {
            blockTwoStepsForward.classList.add('valid-move');
        }

        
    }

    if (piece.classList.contains("fa-chess-knight")) {
        const currentPosition = parseInt(piece.parentElement.dataset.order);
        piece.classList.add('pick');

        const currentPositionBlock = document.querySelector(`.chessboard__block[data-order='${currentPosition}']`);
        if (currentPositionBlock) {
            currentPositionBlock.classList.add('current-position');
        }


        const validMoves = [currentPosition + 6,  currentPosition + 15, currentPosition + 17, currentPosition - 6,  currentPosition - 15, currentPosition - 17];
        validMoves.forEach(move => {
            const block = document.querySelector(`.chessboard__block[data-order='${move}']`);
            if (block && board[move] === null) {
                block.classList.add('valid-move');
            }
        })
    }
}

function validateMove(piece, from, to) {
    //if(piece === king) {
    //   if (check(piece)) {
    //      move king
    //   } 
    //}
    //else {
    // move piece
    //}
    return Boolean;
}

function movePiece(piece, from, to) {
    // move piece
}

function showMoveHistory() {
    // show move history
}

//content 
content.appendChild(chessboard);
