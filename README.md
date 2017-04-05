# Tic Tac Toe Core

A simple function for processing moves in a Tic Tac Toe game. Validates moves and checks for win and stalemate conditions. Tic Tac Toe does not provide an interface for playing the game, managing players, or any other higher level functionality.

# Usage

The turn engine accepts two arguments, `move` and `board`. Move is a three member array, with the following structure: `[rowIndex, colIndex, playerSymbol]`. `board` is a two dimensional array, containing player symbols for occupied squares and `null` for empty squares.

The turn engine will throw an error if the move entered is invalid (indices out of range or attempting to overwrite an occupied square).

The turn engine returns an array with the following format:

`[gameStatus, playerSymbol, board]`

If the turn has caused a win, `gameStatus` will be 2, if the turn has caused a stalemate, `gameStatus` will be 1, otherwise `gameStatus` will be 0.

The board object returned will be the same object that was passed in, modified in place to represent the move made.

Below is a demonstration of a simple, shell-based two player tic tac toe game using the engine. 

```javascript

'use strict';

const processTurn = require('tic-tac-toe-core');

const board = [[null, null, null],[null, null, null],[null, null, null]];
const players = ['X', 'O'];

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const parseAnswer = (answer) => {
    return answer.replace(/\s/,'').split('').map((d) =>{ return +d; }).reverse();
};

const getMove = (player) => { return new Promise((resolve) => {
    rl.resume();
    rl.question(`Player '${player}', make your move:`, (answer) => {
        rl.pause();
        return resolve(parseAnswer(answer));
    });
})};

const win = (player) => {
    console.log(`Player ${player} has won!`);
    process.exit(0);
}

const stalemate = () => {
    console.log(`Stalemate :(`));
    process.exit(0);
}

const printBoard = (board) => {
    let output = `
   0    1    2
0   ${board[0][0] || ' '} | ${board[0][1] || ' '} | ${board[0][2] || ' '}
  -------------
1   ${board[1][0] || ' '} | ${board[1][1] || ' '} | ${board[1][2] || ' '}
  -------------
2   ${board[2][0] || ' '} | ${board[2][1] || ' '} | ${board[2][2] || ' '}
`;
    console.log(output);
};

const handler = (async () => { 
    printBoard(board);
    let currentPlayer = players[0];
    try{
        let move = await getMove(currentPlayer);
        move.push(currentPlayer);
        let result = processTurn(move, board);
        if(result[0] == 2) return win(currentPlayer);
        if(result[0] == 1) return stalemate();
        players.push(players.shift());
    } catch(e) {
        console.error(e);
    }
    
    handler();
});

handler();

```