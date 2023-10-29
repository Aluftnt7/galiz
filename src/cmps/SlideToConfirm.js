import React, { useState } from "react";
import "../App.css";

const SlideToConfirm = () => {
  const [isSliding, setIsSliding] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleMouseDown = () => {
    setIsSliding(true);
  };

  const handleMouseUp = () => {
    if (isSliding) {
      setIsSliding(false);
      setIsConfirmed(true);
    }
  };

  const resetConfirmation = () => {
    setIsConfirmed(false);
  };

  return (
    <div
      className={`slide-to-confirm ${isConfirmed ? "confirmed" : ""}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={resetConfirmation}
    >
      <div
        className={`slider ${isSliding ? "sliding" : ""}`}
        onMouseDown={handleMouseDown}
      >
        <span>Slide to Confirm</span>
      </div>
    </div>
  );
};

export default SlideToConfirm;
