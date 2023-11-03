export const infoPiece = {
    name: "",
    color: "white",
    position: 12,
};

function getInfoPiece(name, position) {
    this.name = name;
    this.position = position;
    this.color = this.name.substring(0, 5); 
}

export const testData = [
    getInfoPiece("whiteKing", 10)
];


function test() {
    for (let idx = 0; idx < testData.length; idx++) {
        testData[idx].getInfoPiece
    }
}

export const arrInfoPieces = [
    [
        {
            name: "pawn",
            color: "white",
            position: [12, 22, 32, 42, 52, 62, 72, 82]
        },
        
        {
            name: "rook",
            position: 13
        },
    
        {
            name: "knight",
            position: 15
        },
    
        {
            name: "bishop",
            position: 19
        },
    
        {   
            name: "queen",
            position: 24
        }
    ],

    [
        {
            name: "king",
            position: 12
        }
    ]
];

// console.log(arrInfoPieces[idColor.WHITE][idPiece.BISHOP].name);