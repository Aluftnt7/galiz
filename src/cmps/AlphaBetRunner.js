import React, { useState, useEffect } from "react";

const AlphabetRunner = ({
  letters,
  setLetters,
  letterChosen,
  setLetterChosen,
}) => {
  const [runningLetter, setRunningLetter] = useState("");
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * letters.length);
        setRunningLetter(letters[randomIndex]);
      }, 100);
    } else {
      clearInterval(interval);
      setRunningLetter("");
    }

    return () => clearInterval(interval);
  }, [isRunning, letters]);

  const startRunning = () => {
    setIsRunning(true);
  };

  const stopRunning = () => {
    setLetterChosen(runningLetter);
    setIsRunning(false);
  };

  return (
    <div>
      <div className="runing-letter">{runningLetter}</div>
      <button
        onClick={isRunning ? stopRunning : startRunning}
        className="letter-button"
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front text"> סטופ</span>
      </button>
    </div>
  );
};

export default AlphabetRunner;
