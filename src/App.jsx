import React, { useState } from "react";
import "./index.css";
import CarRace from "./CarRace";


const teams = [
  { name: "Team Blue Lightning", colorClass: "bg-blue-500" },
  { name: "Team Black Panther", colorClass: "bg-black" },
  { name: "Team Royal Flash", colorClass: "bg-purple-500" },
  { name: "Team Orange Blaze", colorClass: "bg-orange-500" }
];

export default function App() {
  const [winner, setWinner] = useState("Press Start to begin the race!");

  const startRace = () => {
    const randomWinner = Math.floor(Math.random() * 4);
    setWinner(`${teams[randomWinner].name} wins the race!`);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <button
          onClick={startRace}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
        >
          Start Race
        </button>
        <div className="mt-4 text-xl font-semibold">{winner}</div>
      </div>

      <div className="space-y-4">
        {teams.map((team, index) => (
          <div key={index} className="relative h-20 border rounded flex items-center">
            <div className="w-10 text-center font-bold">{index + 1}</div>
            <div className="car1 absolute left-10 transition-all duration-1000">
              <img
                src="https://freesvg.org/img/SimpleBrightGreenCarTopView.png"
                alt="Car"
                className="h-12"
              />
            </div>
            <div className="absolute right-0 h-full w-2 bg-red-500"></div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full ${team.colorClass}`}></div>
            <span>{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
