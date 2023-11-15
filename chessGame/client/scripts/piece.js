const handlerMove = {
    handleMoveTopPiece(currentPosition) {
        // currentPosition.y : decrease
        // currentPosition.x : const
        const collectMove = [];

        for (let index = currentPosition.y * 1 - 1; index >= 1; index--) {
            collectMove.push(`${currentPosition.x}${index}`);
        }

        return collectMove;
    },

    handleMoveRightPiece(currentPosition) {
        // currentPosition.x : increase
        // currentPosition.y : const
        const collectMove = [];

        for (let index = currentPosition.x * 1 + 1; index <= 8; index++) {
            collectMove.push(`${index}${currentPosition.y}`);
        }

        return collectMove;
    },

    handleMoveBottomPiece(currentPosition) {
        // currentPosition.y : increase
        // currentPosition.x : const
        const collectMove = [];
        let index = currentPosition.y + 1;

        for (let index = currentPosition.y * 1 + 1; index <= 8; index++) {
            collectMove.push(`${currentPosition.x}${index}`);
        }

        return collectMove;
    },

    handleMoveLeftPiece(currentPosition) {
        // currentPosition.x : decrease
        // currentPosition.y : const
        const collectMove = [];

        for (let index = currentPosition.x * 1 - 1; index >= 1; index--) {
            collectMove.push(`${index}${currentPosition.y}`);
        }

        return collectMove;
    },

    handleMoveTopRightPiece(currentPosition) {
        // currentPosition.x : increase
        // currentPosition.y : decrease
        const collectMove = [];
        let yTemporary = currentPosition.y * 1;

        for (let index = currentPosition.x * 1 + 1; index <= 8; index++) {
            collectMove.push(`${index}${--yTemporary}`);
            if (yTemporary === 0) {
                return [];
            }

            if (yTemporary <= 1) {
                break;
            }
        }

        console.log("collectMove", collectMove);

        return collectMove;
    },

    handleMoveBottomRightPiece(currentPosition) {
        // currentPosition.x : increase
        // currentPosition.y : increase
        const collectMove = [];
        let yTemporary = currentPosition.y * 1;

        for (let index = currentPosition.x * 1 + 1; index <= 8; index++) {
            collectMove.push(`${index}${++yTemporary}`);

            if (yTemporary === 9) {
                return [];
            }

            if (yTemporary >= 8) {
                break;
            }
        }

        return collectMove;
    },

    handleMoveBottomLeftPiece(currentPosition) {
        // currentPosition.x : decrease
        // currentPosition.y : increase
        const collectMove = [];
        let yTemporary = currentPosition.y * 1;

        for (let index = currentPosition.x * 1 - 1; index >= 1; index--) {
            collectMove.push(`${index}${++yTemporary}`);

            if (yTemporary === 9) {
                return [];
            }

            if (yTemporary >= 8) {
                break;
            }
        }

        return collectMove;
    },

    handleMoveTopLeftPiece(currentPosition) {
        // currentPosition.x : decrease
        // currentPosition.y : decrease
        const collectMove = [];
        let yTemporary = currentPosition.y * 1;

        for (let index = currentPosition.x * 1 - 1; index >= 1; index--) {
            collectMove.push(`${index}${--yTemporary}`);

            if (yTemporary === 0) {
                return [];
            }

            if (yTemporary <= 1) {
                break;
            }
        }

        return collectMove;
    },
};

export default handlerMove;
