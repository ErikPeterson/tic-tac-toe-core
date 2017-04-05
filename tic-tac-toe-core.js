'use strict';

const validMove = (move, board) => {
    return move[0] >= 0 && move[0] <= 2 && move[1] >= 0 && move[1] <= 2 && board[move[0]][move[1]] === null;
};

const applyMove = (move, board) => { 
    if(!validMove(move, board)) throw 'Invalid move';
    board[move[0]][move[1]] = move[2];
    return [checkStatus(board), move[2], board];
}; 

const checkStatus = (board) => {
    return checkWin(board) ? 2 : (checkStalemate(board) ? 1 : 0);
};

const checkWin = (board) => {
    return board.some((row) => { return row[0] !== null && row[0] === row[1] && row[1] === row[2]}) ||
           [0, 1, 2].some((column) => { return board[0][column] !== null && board[0][column] === board[1][column] && board[1][column] === board[2][column]}) ||
           ( board[1][1] !== null && (( board[1][1] === board[0][0] && board[1][1] == board[2][2] ) || ( board[1][1] === board[0][2] && board[1][1] === board[2][0] )));
};

const checkStalemate = (board) => {
    return board.every((row) => { return row[0] && row[1] && row[2]; })
};

module.exports = applyMove;