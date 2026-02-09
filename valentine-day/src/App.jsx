import { useState, useRef } from "react";
import "./App.css";
import bgImage from "./assets/us.jpg";
import song from "./assets/song.mp3";

const funnyMessages = [
  "You are already mine Mutkya 💕",
  "Nice try 😌 still mine!",
  "No option is just for decoration 😏",
  "Ring already booked 💍",
  "Wrong button, Husband 😄",
  "Destiny says YES only ❤️"
];

function App() {
  const [answer, setAnswer] = useState("");
  const [noStyle, setNoStyle] = useState({});
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    x: 0,
    y: 0
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const audioRef = useRef(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleNoAttempt = (e) => {
    const randomMsg =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    setTooltip({
      show: true,
      text: randomMsg,
      x: e.clientX + 15,
      y: e.clientY + 15
    });

    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    const rotate = Math.random() * 360;

    setNoStyle({
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`
    });
  };

  const handleYes = () => {
    playMusic();
    setAnswer("yes");
    setShowConfetti(true);
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${bgImage})` }}
      onClick={playMusic}
    >
      <audio ref={audioRef} loop>
        <source src={song} type="audio/mp3" />
      </audio>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div className="confetti">
          {Array.from({ length: 35 }).map((_, i) => (
            <span key={i}>💖</span>
          ))}
        </div>
      )}

      <div className="card">
        <h1>💘 Happy Valentine’s Day 💘</h1>

        <p className="message">
          From the moment you came into my life, everything felt complete ❤️
          <br />
          I want to ask you something from my heart…
        </p>

        <h2>Will you be my Valentine forever? 💍</h2>

        {!answer && (
          <div className="buttons">
            <button className="yesBtn" onClick={handleYes}>
              Yes 😍
            </button>

            <button
              className="noBtn"
              style={noStyle}
              onMouseEnter={handleNoAttempt}
              onMouseMove={(e) =>
                setTooltip((t) => ({
                  ...t,
                  x: e.clientX + 15,
                  y: e.clientY + 15
                }))
              }
              onTouchStart={(e) => {
                const touch = e.touches[0];
                handleNoAttempt({
                  clientX: touch.clientX,
                  clientY: touch.clientY
                });
              }}
              onClick={(e) => e.preventDefault()}
            >
              No 🙈
            </button>
          </div>
        )}

        {answer === "yes" && (
          <h3 className="yes">
            Yaaay! 💖 <br />
            You are stuck with me forever 😘 <br />
            Happy Valentine’s Day, my husband ❤️
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
