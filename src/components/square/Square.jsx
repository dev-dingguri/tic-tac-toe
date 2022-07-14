import React from 'react';
import styles from './Square.module.css';

const Square = (props) => {
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
