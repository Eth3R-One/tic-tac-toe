import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

/**
 * @ 1. Create a tic tac toe game
 * @ 2. Create a restart button
 * @ 3. Create a popup to show the winner
 * @ 4. Create a new game button in the popup
 * @ 5. Create a function to check the winner
 * @ 6. Create a function to check if the game is draw
 * @ 7. Scoreboard
 */

function checkWinner(game) {
  const winningCombinations = [
    [0, 1, 2], // 0
    [3, 4, 5], // 1
    [6, 7, 8], // 2
    [0, 3, 6], // 3
    [1, 4, 7], // 4
    [2, 5, 8], // 5
    [0, 4, 8], // 6
    [2, 4, 6], // 7
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      game[a].value &&
      game[a].value === game[b].value &&
      game[a].value === game[c].value
    ) {
      return game[a].value;
    }
  }
  return null;
}

function checkDraw(game) {
  for (let i = 0; i < game.length; i++) {
    if (game[i].value === "") {
      return false;
    }
  }
  return true;
}

function checkGameOver(game) {
  if (checkWinner(game)) {
    return true;
  }
  if (checkDraw(game)) {
    return true;
  }
  return false;
}

function showPopup(message) {
  const popup = document.querySelector(".popup");
  const messageElement = document.querySelector("#message");
  messageElement.textContent = message;
  popup.classList.remove("hide");
}

function hidePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("hide");
}

// "〇" : "✕"
export default function App() {
  const arr = new Array(9);
  for (let i = 0; i < 9; i++) {
    arr[i] = {
      id: i,
      value: "",
    };
  }
  const [symbol, setSymbol] = useState("✕");
  const [game, setGame] = useState(arr);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  function insertIntoArray(id) {
    if (game[id].value === "✕" || game[id].value === "o") return;
    const newArr = game.map((el) => {
      if (el.id === id) {
        return { ...el, value: symbol };
      }
      return el;
    });
    setGame(newArr);
    setSymbol(symbol === "✕" ? "〇" : "✕");
    if (checkGameOver(newArr)) {
      if (checkWinner(newArr)) {
        showPopup(`${checkWinner(newArr)} wins`);
        if (checkWinner(newArr) === "✕") {
          setPlayer1Score(player1Score + 1);
        }
        if (checkWinner(newArr) === "〇") {
          setPlayer2Score(player2Score + 1);
        }
      } else {
        showPopup("Draw");
      }
    }
  }
  function resetGame() {
    restartGame();
    setPlayer1Score(0);
    setPlayer2Score(0);
  }

  function restartGame() {
    setGame(arr);
    setSymbol("✕");
    hidePopup();
  }
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="scoreboard">
            <div>
              <p>Player ✕</p>
              <span>{player1Score}</span>
            </div>
            <div>
              <p>Player 〇</p>
              <span>{player2Score}</span>
            </div>
          </div>
          {game.map((el) => (
            <AddBox
              click={() => {
                console.log(el.id);
                insertIntoArray(el.id);
              }}
              key={el.id}
              id={el.id}
            >
              {el.value}
            </AddBox>
          ))}
        </div>
      </div>
      <div className="popup hide">
        <p id="message">Sample Message</p>
        <button id="new-game" onClick={restartGame}>
          New Game
        </button>
      </div>
      <button id="reset" onClick={resetGame}>
        Reset
      </button>
    </>
  );
}

function AddBox({ id, click, children }) {
  return (
    <button className="button-option" onClick={click}>
      {children}
    </button>
  );
}
