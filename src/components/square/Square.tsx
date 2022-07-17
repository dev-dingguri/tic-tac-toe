import React from 'react';
import styles from './Square.module.css';

type SquareProps = {
  value: string | null,
  isCaused: boolean,
  onClick: () => void;
}
const Square = (props: SquareProps) => {
  return (
    <button
      className={`${styles.square} ${props.isCaused ? styles.caused : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
