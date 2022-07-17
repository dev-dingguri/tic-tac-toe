import React from 'react';
import Square from '../square/Square';
import styles from './Board.module.css';

type BoardProps = {
  squares: (string|null)[],
  caused: number[],
  onClick: (i: number) => void;
}
const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => {
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

  const board: JSX.Element[] = [];
  for (let i = 0; i < 3; ++i) {
    const squares: JSX.Element[] = [];
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
