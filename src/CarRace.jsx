import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const carNames = [
  "Team Blue Lightning",
  "Team Black Panther",
  "Team Royal Flash",
  "Team Orange Blaze",
];

export default function CarRace() {
  const [winner, setWinner] = useState("");
  const [raceHappening, setRaceHappening] = useState(false);
  const carsRef = useRef([]);
  const trackRef = useRef(null);

  const startRace = () => {
    if (raceHappening) return;
    setRaceHappening(true);
    setWinner("And they're off!");

    // Reset cars to starting line
    carsRef.current.forEach((car) => {
      gsap.set(car, { left: 50 });
    });

    const finishLine = window.innerWidth - 150;
    const winnerIndex = Math.floor(Math.random() * carsRef.current.length);

    const raceTimeline = gsap.timeline({
      onComplete: () => {
        setWinner(`${carNames[winnerIndex]} wins the race!`);
        setRaceHappening(false);
      },
    });

    carsRef.current.forEach((car, index) => {
      let time = 3 + Math.random() * 2;
      if (index === winnerIndex) time = 3;

      raceTimeline.to(
        car,
        {
          left: finishLine,
          duration: time,
          ease: "power1.inOut",
          onStart: () => {
            gsap.to(car, {
              y: "+=3",
              duration: 0.1,
              repeat: 8,
              yoyo: true,
            });
          },
        },
        0
      );
    });

    raceTimeline.to(
      trackRef.current,
      {
        x: "+=5",
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      },
      3.5
    );
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold text-center text-white mb-4">🚗 Car Race Game 🚗</h1>
      <button
        onClick={startRace}
        disabled={raceHappening}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mx-auto block"
      >
        {raceHappening ? "Race in Progress..." : "Start Race"}
      </button>
      <div
        ref={trackRef}
        className="relative bg-gray-700 rounded-xl overflow-hidden p-4 h-40 race-track-container"
      >
        {carNames.map((name, index) => (
          <div
            key={index}
            ref={(el) => (carsRef.current[index] = el)}
            className="car absolute top-0 flex items-center justify-center h-12 w-24 bg-yellow-400 rounded-full text-black font-bold shadow-lg"
            style={{ top: index * 60 }}
          >
            🏎️
          </div>
        ))}
      </div>
      <p className="text-center text-xl font-semibold text-green-400">{winner}</p>
    </div>
  );
}
