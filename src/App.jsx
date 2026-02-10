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

  const moveNoButton = (e) => {
    if (answer) return;
    e.preventDefault();

    const msg =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    const x = e.clientX || e.touches?.[0]?.clientX || 100;
    const y = e.clientY || e.touches?.[0]?.clientY || 100;

    setTooltip({ show: true, text: msg, x: x + 10, y: y + 10 });

    setNoPos({
      top: `${Math.random() * 60 + 20}%`,
      left: `${Math.random() * 60 + 20}%`
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

  const wave1 = createWave(50, 0);
  const wave2 = createWave(40, 0.4);
  const wave3 = createWave(30, 0.8);

  setHearts([...wave1, ...wave2, ...wave3]);

  navigator.vibrate?.([200, 100, 200]);
};



  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <audio ref={audioRef} loop>
        <source src={song} type="audio/mp3" />
      </audio>

      {/* ❤️ Heart Start Overlay */}
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
          <h2> Don’t overthink it. You never do anyway 😄</h2>
          {!answer && (
            <div className="buttons">
              <button className="yesBtn" onClick={handleYes}>
                Yes 😍
              </button>

              <button
                className="noBtn"
                style={{ top: noPos.top, left: noPos.left }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
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
      )}
    </div>
  );
}

export default App;
