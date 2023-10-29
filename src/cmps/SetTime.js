import React, { useState } from "react";

const SetTime = () => {
  const [time, setTime] = useState("0:0");

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const startFunction = () => {
    const [enteredMinutes, enteredSeconds] = time.split(":").map(Number);
    const totalDuration = (enteredMinutes * 60 + enteredSeconds) * 1000;

    console.log(`Function will run for ${totalDuration} milliseconds`);

    setTimeout(() => {
      console.log("Your function has run for the specified duration.");
    }, totalDuration);
  };

  return (
    <div>
      <label htmlFor="time">Time (minutes:seconds):</label>
      <input
        type="text"
        id="time"
        value={time}
        onChange={handleTimeChange}
        placeholder="e.g., 2:30"
      />

      <button onClick={startFunction}>Start Function</button>
    </div>
  );
};

export default SetTime;
