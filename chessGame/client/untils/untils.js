const infoPosition = {
    xPosition: 12,
    yPosition: 13
};

const rankPiece = {
    PAWN: "pawn",
    ROCK: "rock",
    KNIGHT: "knight",
    BISHOP: "bishop",
    QUEEN: "queen",
    KING: "king"
}

export const colorPiece = {
    BLACK: 0,
    WHITE: 1,
    MAX: 2
}

function getInfoPiece(infoPiece) {
    const color = infoPiece.name.substring(0, 5);

    return {
        name: infoPiece.name,
        x: infoPiece.x,
        y: infoPiece.y,
        rank: infoPiece.rank,
        color: color
    };
}

export const arrInfoPieces = [
    [
        // getInfoPiece({name: "blackPawn1", x: 1, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn2", x: 2, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn3", x: 3, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn4", x: 4, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn5", x: 5, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn6", x: 6, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn7", x: 7, y: 2, rank: rankPiece.PAWN}),
        // getInfoPiece({name: "blackPawn8", x: 8, y: 2, rank: rankPiece.PAWN}),

        getInfoPiece({name: "blackRock1", x: 3, y: 3, rank: rankPiece.ROCK}),
        // getInfoPiece({name: "blackRock2", x: 8, y: 1, rank: rankPiece.ROCK}),

        // getInfoPiece({name: "blackKnight1", x: 2, y: 1, rank: rankPiece.KNIGHT}),
        // getInfoPiece({name: "blackKnight2", x: 7, y: 1, rank: rankPiece.KNIGHT}),

        // getInfoPiece({name: "blackBishop1", x: 3, y: 1, rank: rankPiece.BISHOP}),
        // getInfoPiece({name: "blackBishop2", x: 6, y: 1, rank: rankPiece.BISHOP}),

        // getInfoPiece({name: "blackQueen", x: 4, y: 1, rank: rankPiece.QUEEN}),
        // getInfoPiece({name: "blackKing", x: 5, y: 1, rank: rankPiece.KING}),
    ],

    // [
    //     getInfoPiece({name: "whitePawn1", x: 1, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 2, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 3, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 4, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 5, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 6, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 7, y: 7, rank: rankPiece.PAWN}),
    //     getInfoPiece({name: "whitePawn2", x: 8, y: 7, rank: rankPiece.PAWN}),

    //     getInfoPiece({name: "whiteRock1", x: 1, y: 8, rank: rankPiece.ROCK}),
    //     getInfoPiece({name: "whiteRock2", x: 8, y: 8, rank: rankPiece.ROCK}),

    //     getInfoPiece({name: "whiteKnight1", x: 2, y: 8, rank: rankPiece.KNIGHT}),
    //     getInfoPiece({name: "whiteKnight2", x: 7, y: 8, rank: rankPiece.KNIGHT}),

    //     getInfoPiece({name: "whiteBishop1", x: 3, y: 8, rank: rankPiece.BISHOP}),
    //     getInfoPiece({name: "whiteBishop2", x: 6, y: 8, rank: rankPiece.BISHOP}),

    //     getInfoPiece({name: "whiteQueen", x: 4, y: 8, rank: rankPiece.QUEEN}),
    //     getInfoPiece({name: "whiteKing", x: 5, y: 8, rank: rankPiece.KING}),
    // ]
];
