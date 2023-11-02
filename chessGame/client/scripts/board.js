
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
    for (let row = 1; row < 9; row++) {
        const numberIndex = document.getElementById(`${1}${row}`);

        row % 2 === 0 ? numberIndex.innerHTML = `<span class="textWhite">${row}</span>`
                      : numberIndex.innerHTML = `<span class="textBlack">${row}</span>`
    
    }
}

renderBoardGame();
renderTextBoardGame();