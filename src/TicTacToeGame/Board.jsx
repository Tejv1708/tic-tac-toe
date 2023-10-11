import { useCallback, useEffect, useState } from "react";
import Square from "./Square";
const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [xWinsCount, setXWinsCount] = useState(0);
  const [oWinsCount, setOWinsCount] = useState(0);
  //   const [isOWinner, setOWinner] = useState(0);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] != null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  useEffect(() => {
    const storedXWinsCount =
      JSON.parse(window.localStorage.getItem("xWinsCount")) || 0;
    const storedOWinsCount =
      JSON.parse(window.localStorage.getItem("oWinsCount")) || 0;
    setXWinsCount(storedXWinsCount);
    setOWinsCount(storedOWinsCount);
  }, []);

  useEffect(() => {
    if (isWinner === "X") {
      const updatedXWinsCount = xWinsCount + 1;
      setXWinsCount(updatedXWinsCount);
      window.localStorage.setItem(
        "xWinsCount",
        JSON.stringify(updatedXWinsCount)
      );
    } else if (isWinner === "O") {
      const updatedOWinsCount = oWinsCount + 1;
      setOWinsCount(updatedOWinsCount);
      window.localStorage.setItem(
        "oWinsCount",
        JSON.stringify(updatedOWinsCount)
      );
    }
  }, [isWinner]);

  const handleClick = (index) => {
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
  };

  return (
    <div className="board-container">
      <div>{`X is wins ${xWinsCount}`}</div>
      <div>{`O is wins ${oWinsCount}`}</div>
      {isWinner ? (
        <>
          {isWinner} won the game
          <button onClick={handleReset}>Play Again</button>
        </>
      ) : (
        <>
          <div className="board-row">
            <Square value={state[0]} onClick={() => handleClick(0)} />
            <Square value={state[1]} onClick={() => handleClick(1)} />
            <Square value={state[2]} onClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={state[3]} onClick={() => handleClick(3)} />
            <Square value={state[4]} onClick={() => handleClick(4)} />
            <Square value={state[5]} onClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={state[6]} onClick={() => handleClick(6)} />
            <Square value={state[7]} onClick={() => handleClick(7)} />
            <Square value={state[8]} onClick={() => handleClick(8)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
