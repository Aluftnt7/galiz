import React, { useState } from "react";
import "../App.css"; // Import your CSS

const SwipeCard = ({ text }) => {
  const [initialX, setInitialX] = useState(null);
  const [transformValue, setTransformValue] = useState(0);
  const [showImage, setShowImage] = useState(true);

  const handleTouchStart = (e) => {
    setInitialX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (initialX === null || !showImage) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - initialX;
    setTransformValue(deltaX);
  };

  const handleTouchEnd = () => {
    if (initialX === null || !showImage) return;
    if (transformValue > 50) {
      // Swipe right, hide the image
      setShowImage(false);
    } else if (transformValue < -50) {
      // Swipe left, hide the image
      setShowImage(false);
    } else {
      // No significant swipe, reset the transform
      setTransformValue(0);
    }
    setInitialX(null);
  };

  return (
    <div className="swipe-container">
      {showImage && (
        <img
          className="swipe-img"
          src={text}
          alt="Swipe Image"
          style={{ transform: `translateX(${transformValue}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
};

export default SwipeCard;
