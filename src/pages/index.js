import { useState, useEffect, use } from "react";

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export default function Home() {
  const [xTurn, setXTurn] =useState(true);
  const [oTurn, setOTurn] = useState(true);
  // let xWins = 0;
  // let oWins = 0;
  const [xWins, setXWins] =useState(true);
  const [oWins, setOWins] = useState(true);
  const [won, setWon] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [modalTitle, setModalTitle] =useState(false);

  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });


  useEffect(() => {
    checkWinner();
  }, [boardData]);

  const updateBoardData = (idx) => {
    if (!boardData[idx] && !won) {
      //will check whether specify idx is empty or not
      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };

  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWon(true);
        setWonCombo([a, b, c]);
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!`);
        !xTurn ? setXWins(xWins+1) : setOWins(oWins+1);
        return
      }
    });
  };

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v]);
    setIsDraw(check);
    if (check) setModalTitle("Match Draw!!!");
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game__menu">
          <p>{won ? "Game Over" : (xTurn === true ? "X Turn" : "O Turn")}</p>
        </div>
        <div>{`X Wins: ${xWins} : O Wins: ${oWins}`}</div>
        <div className="game__board">
          {[...Array(9)].map((v, idx) => {
            return (
              <div
                key={idx}
                className={wonCombo.includes(idx) ? "square highlight" : "square"}
                onClick={won ? null : () => {
                  updateBoardData(idx);
                }}
              >
                {boardData[idx]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
