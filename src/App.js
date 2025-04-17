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
const cricketers = [virat, rohit, msdhoni, kapil, sachin, dhawan, arshdeep, shubhman, abhishek, 
  dinesh, harbhajan, hardik, jasprit, ravindra, shreyash, siraj ];


function shuffle(images) {
  const duplicated = [...images, ...images];
  return duplicated
    .map((image) => ({ image, id: Math.random(), flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
}

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [score, setScore] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });

  useEffect(() => {
    setCards(shuffle(cricketers));
  }, []);

  const handleClick = (card) => {
    if (flippedCards.length === 2 || card.flipped || card.matched) return;

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
          setPlayerTurn((prev) => (prev === 4 ? 1 :  prev + 1));
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      const winner =
        score[1] > score[2] > score[3] > score[4]
          ? '🏆 Player 1 Wins!'
          : score[4] > score[1]
          ? '🏆 Player 4 Wins!'
          : "🤝 It's a Tie!";
      setTimeout(() => {
        alert(
          `Game Over!\n\nPlayer 1: ${score[1]}\nPlayer 2: ${score[2]}\n\nPlayer 3: ${score[3]}\n\nPlayer 4: ${score[4]}\n${winner}`
        );
      }, 500);
    }
  }, [cards, score]);

  const restartGame = () => {
    setCards(shuffle(cricketers));
    setFlippedCards([]);
    setPlayerTurn(1);
    setScore({ 1: 0, 2: 0, 3: 0, 4: 0 });
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <div className="scoreboard">
        <span className={playerTurn === 1 ? 'active' : ''}>Player 1: {score[1]}</span>
        <span className={playerTurn === 2 ? 'active' : ''}>Player 2: {score[2]}</span>
        <span className={playerTurn === 3 ? 'active' : ''}>Player 3: {score[3]}</span>
        <span className={playerTurn === 4 ? 'active' : ''}>Player 4: {score[4]}</span>
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
    </div>
  );
}

export default App; 
