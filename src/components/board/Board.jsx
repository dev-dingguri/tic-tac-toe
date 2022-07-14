import React from 'react';
import Square from '../square/Square';
import styles from './Board.module.css';

const Board = (props) => {
  const renderSquare = (i) => {
    const isCaused = props.caused ? props.caused.includes(i) : false;
    return (
      <Square
        key={i}
        value={props.squares[i]}
        isCaused={isCaused}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const board = [];
  for (let i = 0; i < 3; ++i) {
    const squares = [];
    for (let j = 0; j < 3; ++j) {
      squares.push(renderSquare(i * 3 + j));
    }
    board.push(
      <div key={i} className={styles.boardRow}>
        {squares}
      </div>
    );
  }
  return <div>{board}</div>;
};

export default Board;
