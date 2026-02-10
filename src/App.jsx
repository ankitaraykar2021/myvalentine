import { useState, useRef, useEffect } from "react";
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
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [noPos, setNoPos] = useState({ top: "60%", left: "55%" });
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);

  const audioRef = useRef(null);

  const startExperience = () => {
    if (!started && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setStarted(true);
    }
  };

  // 🔄 Auto move NO button continuously
  useEffect(() => {
    if (answer) return;

    const interval = setInterval(() => {
      setNoPos({
        top: `${Math.random() * 60 + 20}%`,
        left: `${Math.random() * 60 + 20}%`
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [answer]);

  const showTooltip = (e) => {
    if (answer) return;

    const msg =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    const x = e.clientX || e.touches?.[0]?.clientX || 150;
    const y = e.clientY || e.touches?.[0]?.clientY || 150;

    setTooltip({
      show: true,
      text: msg,
      x: x + 12,
      y: y + 12
    });
  };

  const handleYes = () => {
    setAnswer("yes");
    setTooltip({ show: false });

    const createWave = (count, delayOffset = 0) =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
        rotate: Math.random() * 360,
        delay: delayOffset + Math.random() * 0.3,
        size: Math.random() * 16 + 22
      }));

    setHearts([
      ...createWave(50, 0),
      ...createWave(40, 0.4),
      ...createWave(30, 0.8)
    ]);

    navigator.vibrate?.([200, 100, 200]);
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <audio ref={audioRef} loop>
        <source src={song} type="audio/mp3" />
      </audio>

      {!started && (
        <div className="heartOverlay" onClick={startExperience}>
          ❤️
        </div>
      )}

      {tooltip.show && !answer && (
        <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}

      {hearts.map((h, i) => (
        <span
          key={i}
          className="heartBlast"
          style={{
            "--x": `${h.x}px`,
            "--y": `${h.y}px`,
            "--r": `${h.rotate}deg`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}px`
          }}
        >
          ❤️
        </span>
      ))}

      {started && (
        <div className="card">
          <h1>💘 Happy Valentine’s Day 💘</h1>

          <p className="message">
            From the moment you came into my life, everything felt complete ❤️
            <br />
            I want to ask you something from my heart…
          </p>

          <h2>Will you be my Valentine forever? 💍</h2>
          <h2>Don’t overthink it. You never do anyway 😄</h2>

          {!answer && (
            <div className="buttons">
              <button className="yesBtn" onClick={handleYes}>
                Yes 😍
              </button>

              {/* ❌ NO button (non-clickable, moving) */}
              <button
                className="noBtn"
                style={{ top: noPos.top, left: noPos.left }}
                onMouseEnter={showTooltip}
                onTouchStart={showTooltip}
                onClick={(e) => e.preventDefault()}
                tabIndex={-1}
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
      )}
    </div>
  );
}

export default App;
