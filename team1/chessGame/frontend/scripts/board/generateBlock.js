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