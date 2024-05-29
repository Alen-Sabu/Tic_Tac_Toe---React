import { useState } from "react";


const Square = ({value, onSquareClick}) => {
  return <button onClick={onSquareClick} style={{height: 20, width:20}} className='square'>{value}</button>
}

const Board = ({xIsNext, squares, onPlay}) => {

  const winner = calculateWinner(squares)
  let status;
  if(winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X": "O")
  }

  const squareClick = (i) => {
    if(squares[i] || calculateWinner(squares)) {
      return ;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

 
  return (
    <>
    <div className="status">{status}</div>
    <div className='board-row'>
    <Square value={squares[0]} onSquareClick={() => squareClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => squareClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => squareClick(2)}/>
    </div>
    <div className='board-row'>
    <Square value={squares[3]} onSquareClick={() => squareClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => squareClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => squareClick(5)}/>
    </div>
    <div className='board-row'>
    <Square value={squares[6]} onSquareClick={() => squareClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => squareClick(7)}/>
    <Square value={squares[8]} onSquareClick={() => squareClick(8)}/>
    </div>
    </>
  )
}

const Game = () => {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 == 0
  const currentSquares = history[currentMove]

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Go to move : " + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick = {() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

    return (
      <div className="game">
        <div className="game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    )
}

const App = () => {
  return (
    <div>
     <Game />
    </div>
  )
}

export default App

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
  ]
  for(let i = 0; i<lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] )
      return squares[a];
  }
  return null ;
}