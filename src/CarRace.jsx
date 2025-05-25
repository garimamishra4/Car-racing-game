import React, { useState, useRef } from "react";
import gsap from "gsap";
import "./index.css";

const teams = [
  {
    name: "Team Blue Lightning",
    colorClass: "bg-blue-500",
    carColor: "#3B82F6",
  },
  { name: "Team Black Panther", colorClass: "bg-black", carColor: "#1F2937" },
  {
    name: "Team Royal Flash",
    colorClass: "bg-purple-500",
    carColor: "#8B5CF6",
  },
  {
    name: "Team Orange Blaze",
    colorClass: "bg-orange-500",
    carColor: "#F97316",
  },
];

export default function CarRace() {
  const [winner, setWinner] = useState("Press Start to begin the race!");
  const [isRacing, setIsRacing] = useState(false);
  const carRefs = useRef([]);
  const containerRef = useRef(null);

  const startRace = () => {
    if (isRacing) return;

    setIsRacing(true);
    setWinner("Ready...");

    // Reset all car positions
    carRefs.current.forEach((car) => {
      if (car) gsap.set(car, { left: 50 });
    });

    const container = containerRef.current;
    const containerWidth = container.getBoundingClientRect().width;
    const finishLine = containerWidth - 80; // Adjust to stop before the finish line

    const randomWinner = Math.floor(Math.random() * teams.length);
    const raceTimeline = gsap.timeline({
      onComplete: () => {
        setIsRacing(false);
      },
    });

    // Countdown sequence
    raceTimeline
      .call(() => setWinner("3..."))
      .to(".winner-announcement", {
        scale: 1.1,
        duration: 0.2,
        ease: "power1.out",
      })
      .to(".winner-announcement", {
        scale: 1,
        duration: 0.2,
        ease: "power1.in",
      })
      .call(() => setWinner("2..."), [], "+=0.3")
      .to(".winner-announcement", {
        scale: 1.1,
        duration: 0.2,
        ease: "power1.out",
      })
      .to(".winner-announcement", {
        scale: 1,
        duration: 0.2,
        ease: "power1.in",
      })
      .call(() => setWinner("1..."), [], "+=0.3")
      .to(".winner-announcement", {
        scale: 1.1,
        duration: 0.2,
        ease: "power1.out",
      })
      .to(".winner-announcement", {
        scale: 1,
        duration: 0.2,
        ease: "power1.in",
      })
      .call(() => setWinner("GO!"), [], "+=0.3");

    // Start the race after countdown
    carRefs.current.forEach((car, index) => {
      let duration = 3 + Math.random() * 2;
      if (index === randomWinner) {
        duration = 3;
        // Announce winner when winning car reaches finish line
        raceTimeline.call(
          () => setWinner(`🏆 ${teams[randomWinner].name} wins the race! 🏆`),
          [],
          `+=${duration}`
        );
      }

      raceTimeline.to(
        car,
        {
          left: finishLine,
          duration: duration,
          ease: "power2.inOut",
          onStart: () => {
            gsap.to(car, {
              y: "+=2",
              duration: 0.1,
              repeat: -1,
              yoyo: true,
            });
          },
        },
        2 // Start racing after countdown
      );
    });

    // Smaller shake effect right after winner is announced
    raceTimeline.to(
      ".race-track-container",
      {
        x: "+=3",
        duration: 0.1,
        repeat: 3,
        yoyo: true,
      },
      "+=0.2" // Reduced delay
    );
  };

  return (
    <div className="race-container min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-6">
            🏎️ Racing Championship 🏎️
          </h1>
          <button
            onClick={startRace}
            disabled={isRacing}
            className="start-button bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-lg shadow-lg text-xl font-bold hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRacing ? "🏁 Race in Progress..." : "🚦 Start Race"}
          </button>
          <div className="winner-announcement text-2xl font-bold text-yellow-300">
            {winner}
          </div>
        </div>

        <div
          ref={containerRef}
          className="space-y-4 race-track-container bg-gray-900 p-6 rounded-xl shadow-2xl"
        >
          {teams.map((team, index) => (
            <div
              key={index}
              className="race-track relative h-24 rounded-lg flex items-center overflow-hidden border border-gray-700"
            >
              <div className="lane-number z-10">{index + 1}</div>
              <div
                ref={(el) => (carRefs.current[index] = el)}
                className="car absolute left-10 z-20"
              >
                <svg width="60" height="30" viewBox="0 0 60 30" className="car">
                  <rect
                    x="0"
                    y="5"
                    width="50"
                    height="20"
                    rx="5"
                    fill={team.carColor}
                  />
                  <circle cx="15" cy="25" r="5" fill="#333" />
                  <circle cx="35" cy="25" r="5" fill="#333" />
                  <rect
                    x="40"
                    y="10"
                    width="15"
                    height="10"
                    rx="2"
                    fill={team.carColor}
                  />
                </svg>
              </div>
              <div className="finish-line absolute right-0 h-full w-3"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {teams.map((team, index) => (
            <div
              key={index}
              className="team-indicator flex items-center space-x-3"
            >
              <div className={`w-6 h-6 rounded-full ${team.colorClass}`}></div>
              <span className="text-white font-medium">{team.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
