import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { Square } from './Square'
import { isGameOver, checkWin, minimax } from './helpers'
import './ticTacToe.css';

const X = 'X';
const O = 'O';
const BLANK = null;

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(BLANK));
  const [currentPlayer, setCurrentPlayer] = useState(X);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(BLANK);


  const handleClick = (index, value, gameBoard) => {
    if (gameOver || board[index] !== BLANK) {
      return;
    }
    const newBoard = [...gameBoard];
    newBoard[index] = value;
    setBoard(newBoard);
    
    if (isGameOver(newBoard)) {
      setGameOver(true);
      setWinner(checkWin(newBoard));
    } else {
      setCurrentPlayer(value === X ? O : X);
      setTimeout(() => makeAIMove(newBoard, value === X ? O : X), 1000)
    }
    
    const squares = document.querySelectorAll('.square');
    squares[index].classList.add('clicked');
  };
  

  const makeAIMove = (board, player) => {
    if (player === X) {
      return;
    }
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === BLANK) {
        const newBoard = [...board];
        newBoard[i] = O;
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    handleClick(bestMove, O, board);
  };
  

  const displayWinner = () => {
    if(winner) {
      return (<span>{winner === O ? 'Computer Wins!' : 'You Win!'}</span>)
    }
    return <span>It is a draw!</span>
  }
  
  const resetGame = () => {
    setCurrentPlayer(X)
    setBoard(Array(9).fill(BLANK))
    setGameOver(false)
  }
  
  return (
    <div className="tic-tac-toe">
      {gameOver ? (
        <div className="game-over">{displayWinner()}</div>
        ) : (
        <div className="current-player">{currentPlayer === 'X' ? 'Your turn!' : "Computer's turn :("}</div>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <Square
            key={index}
            value={cell}
            onClick={() => handleClick(index, currentPlayer, board)}
          />
        ))}
      </div>
      <Button className='main success' onClick={() => resetGame()}>New game</Button>
    </div>
  );
};
  
  