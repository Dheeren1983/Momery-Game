import React, { useEffect, useState } from 'react';
import './App.css';
import virat from "./Assets/virat.jpg";
import rohit from "./Assets/rohit.jpg";
import msdhoni from "./Assets/msdhoni.jpg";
import kapil from "./Assets/kapil.jpg";
import arshdeep from "./Assets/arshdeep.jpg";
import dhawan from "./Assets/dhawan.jpg";
import sachin from "./Assets/sachin.jpg";
import shubhman from "./Assets/shubhman.jpg";
import abhishek from "./Assets/abhishek.jpg";
import dinesh from "./Assets/dinesh.jpg";
import harbhajan from "./Assets/harbhajan.jpg";
import hardik from "./Assets/hardik.jpg";
import jasprit from "./Assets/jasprit.jpg";
import ravindra from "./Assets/ravindra.jpg";
import shreyash from "./Assets/shreyash.jpg";
import siraj from "./Assets/siraj.jpg";
const flipSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3");
const clapSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-small-crowd-applause-502.mp3");


const cricketers = [
  virat, rohit, msdhoni, kapil, sachin, dhawan, arshdeep, shubhman,
  abhishek, dinesh, harbhajan, hardik, jasprit, ravindra, shreyash, siraj
];

function shuffle(images) {
  const duplicated = [...images, ...images];
  return duplicated
    .map((image) => ({ image, id: Math.random(), flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
}

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [playerCount, setPlayerCount] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [score, setScore] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (playerCount) {
      const initialScore = {};
      for (let i = 1; i <= playerCount; i++) {
        initialScore[i] = 0;
      }
      setScore(initialScore);
      setCards(shuffle(cricketers));
      setResult(null);
    }
  }, [playerCount]);
  const playFlipSound = () => {
    const audio = new Audio(flipSound);
    audio.play();
  };

  // Function to play clapping sound
  const playClapSound = () => {
    const audio = new Audio(clapSound);
    audio.play();
  };
  const handleClick = (card) => {
    if (flippedCards.length === 2 || card.flipped || card.matched) return;
    playFlipSound();
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.image === second.image && first.id !== second.id) {
        setTimeout(() => {
          setCards((cards) =>
            cards.map((c) =>
              c.image === first.image ? { ...c, matched: true } : c
            )
          );
          setScore((prev) => ({
            ...prev,
            [playerTurn]: prev[playerTurn] + 1,
          }));
          setFlippedCards([]);
        }, 700);
      } else {
        setTimeout(() => {
          setCards((cards) =>
            cards.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setPlayerTurn((prev) => (prev === playerCount ? 1 : prev + 1));
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (
      playerCount &&
      cards.length > 0 &&
      cards.every((card) => card.matched)
    ) {
      const maxScore = Math.max(...Object.values(score));
      const winners = Object.keys(score).filter(
        (player) => score[player] === maxScore
      );
      const winnerText =
        winners.length > 1
          ? "🤝 It's a Tie!"
          : `🏆 Player ${winners[0]} Wins! 👏👏`;
          if (winners.length === 1) playClapSound();
          const resultText =

          Object.keys(score)
  
            .map((p) => `Player ${p}: ${score[p]}`)
  
            .join(" | ") + `\n${winnerText}`;
  
  
  
        setResult(resultText);
    }
  }, [cards, score, playerCount]);

  const restartGame = () => {
    setCards([]);
    setFlippedCards([]);
    setPlayerTurn(1);
    setPlayerCount(null);
    setScore({});
    setResult(null);
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>

      {!playerCount && (
        <div className="player-select">
          <h2>Select number of players</h2>
          {[2, 3, 4].map((count) => (
            <button key={count} onClick={() => setPlayerCount(count)}>
              {count} Players
            </button>
          ))}
        </div>
      )}

      {playerCount && (
        <>
          <div className="scoreboard">
            {Object.keys(score).map((p) => (
              <span key={p} className={playerTurn === Number(p) ? 'active' : ''}>
                Player {p}: {score[p]}
              </span>
            ))}
          </div>
          <div className="grid">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
                onClick={() => handleClick(card)}
              >
                <div className="inner">
                  <div className="front">❓</div>
                  <div className="back">
                    <img src={card.image} alt="cricketer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="restart-btn" onClick={restartGame}>
            🔄 Restart Game
          </button>
          {result && (

<div className="result" style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>

  {result}

</div>

)}
        </>
      )}
    </div>
  );
}

export default App;
