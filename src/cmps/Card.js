import React, { useState } from "react";
import "../App.css";
import SwipeCard from "./SwipeCard";

const Card = ({ text, handlers }) => {
  // const handleTouchMove = (e) => {
  //   if (startX === null) return;

  //   const currentX = e.touches[0].clientX;
  //   const diffX = currentX - startX;

  //   if (diffX > 50) {
  //     // Swipe right
  //     if (onSwipeRight) onSwipeRight();
  //   } else if (diffX < -50) {
  //     // Swipe left
  //     if (onSwipeLeft) onSwipeLeft();
  //   }
  // };

  return (
    <div className={`card`}>
      {/* <img src={text} /> */}
      <p>{text}</p>
      {/* <SwipeCard text={text} /> */}
    </div>
  );
};

export default Card;
