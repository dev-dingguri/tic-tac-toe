import React, { useState } from 'react';
import Board from '../board/Board';
import styles from './Game.module.css';

const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), row: null, col: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAsc, setIsAsc] = useState(true);

  const handleClick = (i) => {
    // 배열의 복사본을 생성하여 수정
    // https://ko.reactjs.org/tutorial/tutorial.html#why-immutability-is-important
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      newHistory.concat([
        { squares: squares, row: Math.floor(i / 3) + 1, col: (i % 3) + 1 },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const handleToggleOrder = () => {
    setIsAsc(!isAsc);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const matchResult = calculateWinner(current.squares);
  const { winner, caused } = matchResult ? matchResult : [];

  const moves = history.map((step, move) => {
    let desc;
    if (move) {
      desc = `Go to move # ${move} (${step.row}, ${step.col})`;
    } else {
      desc = 'Go to game start';
    }
    const selected = move === stepNumber;
    return (
      <li
        key={move}
        className={`${styles.historyItem} ${selected ? styles.selected : ''}`}
      >
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = `Draw`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board
          squares={current.squares}
          caused={caused}
          onClick={handleClick}
        />
      </div>
      <div className={styles.gameInfo}>
        <div>{status}</div>
        <div className={styles.history}>
          <button onClick={handleToggleOrder}>{isAsc ? '⬇' : '⬆'}</button>
          <ol>{isAsc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], caused: lines[i] };
    }
  }
  return null;
};

export default Game;
