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
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const audioRef = useRef(null);

  const playMusic = () => {
    audioRef.current?.play().catch(() => {});
  };

  const handleNoAttempt = (e) => {
    e.preventDefault();

    const msg =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    const xPos = e.clientX || e.touches?.[0]?.clientX || 100;
    const yPos = e.clientY || e.touches?.[0]?.clientY || 100;

    setTooltip({
      show: true,
      text: msg,
      x: xPos + 15,
      y: yPos + 15
    });

    const isMobile = window.innerWidth < 768;
    const x = Math.random() * (isMobile ? 400 : 300) - 200;
    const y = Math.random() * (isMobile ? 300 : 200) - 150;
    const rotate = Math.random() * 360;

    setNoStyle({
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      transition: "transform 0.2s ease-out"
    });
  };

  const handleYes = () => {
    playMusic();
    setAnswer("yes");
    setShowConfetti(true);
    navigator.vibrate?.(300);
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

      {tooltip.show && (
        <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}

      {showConfetti && (
        <div className="confetti">
          {Array.from({ length: 40 }).map((_, i) => (
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
              onTouchStart={handleNoAttempt}
              onTouchMove={handleNoAttempt}
              onClick={(e) => e.preventDefault()}
            >
              No 🙈
            </button>
          </div>
        )}

        {answer === "yes" && (
          <h3 className="yesText">
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
