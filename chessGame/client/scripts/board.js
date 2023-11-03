import {arrInfoPieces, colorPiece} from "../untils/untils.js"

function renderBoardGame() {
    const chessboard = document.getElementById("chessBoard");
    
    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "squareWhite" : "squareBlack");
            square.setAttribute("id", `${col}${row}`);
            chessboard.appendChild(square);            
        }
    }   
}

function renderTextBoardGame() {
    let counter = 8;
    for (let row = 1; row < 9; row++) {
        const numberIndex = document.getElementById(`${1}${row}`);

        row % 2 === 0 ? numberIndex.innerHTML += `<span class="numWhite">${counter--}</span>`
                      : numberIndex.innerHTML += `<span class="numBlack">${counter--}</span>`
    }
    
    const bufferText = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let col = 1; col < 9; col++) { 
        const textIndex = document.getElementById(`${col}${8}`);

        if (col === 1) {
            textIndex.innerHTML += `<span class="textWhite">${bufferText[col - 1]}</span>`
            continue;
        }

        col % 2 === 0 ? textIndex.innerHTML += `<span class="textBlack">${bufferText[col - 1]}</span>`
                      : textIndex.innerHTML += `<span class="textWhite">${bufferText[col - 1]}</span>`
    }
}

function renderPiece() {
    for (let i = 0; i < 2; i++) {
        for (let index = 0; index < arrInfoPieces[i].length; index++) {
            const square = document.getElementById(`${arrInfoPieces[i][index].x}${arrInfoPieces[i][index].y}`);
            square.innerHTML += `<img class="piece" src="../assets/images/pieces/${arrInfoPieces[i][index].color}-${arrInfoPieces[i][index].rank}.svg">`

        }
    }
}

renderBoardGame();
// renderTextBoardGame();
renderPiece();