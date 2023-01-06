const WinningCombinations = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const X = 'X';
const O = 'O';
const BLANK = null;

const isFull = (board) => {
    return board.every((cell) => cell !== null);
};

export const isGameOver = (board) => {
    return checkWin(board) !== null|| isFull(board);

};

export const checkWin = (board) => {
    for (let i = 0; i < WinningCombinations.length; i++) {
        const [a, b, c] = WinningCombinations[i];
        if (board[a] === X && board[b] === X && board[c] === X) {
        return X;
        }
        if (board[a] === O && board[b] === O && board[c] === O) {
        return O;
        }
    }
    return BLANK;
};

export const minimax = (board, depth, isMaximizingPlayer) => {
    const result = checkWin(board);
    if (result !== BLANK) {
        return result === X ? -10 + depth : 10 - depth;
    }

    if (isFull(board)) {
        return 0;
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
        if (board[i] === BLANK) {
            const newBoard = [...board];
            newBoard[i] = O;
            const score = minimax(newBoard, depth + 1, false);
            bestScore = Math.max(bestScore, score);
        }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === BLANK) {
            const newBoard = [...board];
            newBoard[i] = X;
            const score = minimax(newBoard, depth + 1, true);
            bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
        }
};