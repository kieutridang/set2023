function isCheckKing(board, positionX, positionY) {
  const piece = board[positionX][positionY];
  const isBlack = piece.includes("black") ? true : false;

  //pawn
  if (piece) {
    if (piece.includes("Pawn")) {
      const isBlack = piece.includes("black");
      const direction = isBlack ? 1 : -1;

      for (let dy = -1; dy <= 1; dy += 2) {
        let newX = positionX + direction;
        let newY = positionY + dy;
        if (
          newX >= 0 &&
          newX < 8 &&
          newY >= 0 &&
          newY < 8 &&
          board[newX][newY] != null
        ) {
          if (board[newX][newY].includes("King")) {
            return true;
          } else false;
        }
      }
    }
  }

  //knight
  if (piece) {
    if (piece.includes("Knight")) {
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

      for (let i = 0; i < moves.length; i++) {
        let [dx, dy] = moves[i];
        let validX = positionX + dx;
        let validY = positionY + dy;
        if (
          validX >= 0 &&
          validX < 8 &&
          validY >= 0 &&
          validY < 8 &&
          board[validX][validY] != null
        ) {
          if (board[validX][validY] == "King-white" && isBlack) {
            return true;
          } else if (board[validX][validY] == "King-black" && !isBlack) {
            return true;
          }
        }
      }
    }
  }

  //rook
  if (piece) {
    if (piece.includes("Rook")) {
      const moves = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];

      for (let i = 0; i < moves.length; i++) {
        let [dx, dy] = moves[i];
        let validX = positionX + dx;
        let validY = positionY + dy;

        while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
          if (board[validX][validY] != null) {
            if (board[validX][validY] == "King-white" && isBlack) {
              return true;
            } else if (board[validX][validY] == "King-black" && !isBlack) {
              return true;
            }
            break;
          }
          validX += dx;
          validY += dy;
        }
      }
    }
  }

  //bishop
  if (piece) {
    if (piece.includes("Bishop")) {
      const moves = [
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ];

      for (let i = 0; i < moves.length; i++) {
        let [dx, dy] = moves[i];
        let validX = positionX + dx;
        let validY = positionY + dy;

        while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
          if (board[validX][validY] != null) {
            if (board[validX][validY] == "King-white" && isBlack) {
              return true;
            } else if (board[validX][validY] == "King-black" && !isBlack) {
              return true;
            }
            break;
          }
          validX += dx;
          validY += dy;
        }
      }
    }
  }

  //queen
  if (piece) {
    if (piece.includes("Queen")) {
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

      for (let i = 0; i < moves.length; i++) {
        let [dx, dy] = moves[i];
        let validX = positionX + dx;
        let validY = positionY + dy;

        while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
          if (board[validX][validY] != null) {
            if (board[validX][validY] == "King-white" && isBlack) {
              return true;
            } else if (board[validX][validY] == "King-black" && !isBlack) {
              return true;
            }
            break;
          }
          validX += dx;
          validY += dy;
        }
      }
    }
  }

  //king
  if (piece) {
    if (piece.includes("King")) {
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

      for (let i = 0; i < moves.length; i++) {
        let [dx, dy] = moves[i];
        let validX = positionX + dx;
        let validY = positionY + dy;

        while (validX >= 0 && validX < 8 && validY >= 0 && validY < 8) {
          if (board[validX][validY] != null) {
            if (board[validX][validY] == "King-white" && isBlack) {
              return true;
            } else if (board[validX][validY] == "King-black" && !isBlack) {
              return true;
            }
            break;
          }
          validX += dx;
          validY += dy;
        }
      }
    }
  }
  return false;
}
