import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];
    for (let i = 0; i < 3; ++i) {
      const squares = [];
      for (let j = 0; j < 3; ++j) {
        squares.push(this.renderSquare(i * 3 + j));
      }
      board.push(
        <div key={i} className="board-row">
          {squares}
        </div>
      );
    }
    return <div>{board}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), row: null, col: null }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // 배열의 복사본을 생성하여 수정
    // https://ko.reactjs.org/tutorial/tutorial.html#why-immutability-is-important
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        { squares: squares, row: Math.floor(i / 3) + 1, col: (i % 3) + 1 },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc;
      if (move) {
        desc = `Go to move # ${move} (${step.row}, ${step.col})`;
      } else {
        desc = 'Go to game start';
      }
      const selected = move === this.state.stepNumber;
      return (
        <li key={move}>
          <button
            className={`history ${selected ? 'selected' : ''}`}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

// =============================================

const root = createRoot(document.querySelector('#root'));
root.render(<Game />);
