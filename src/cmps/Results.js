import React, { useState, useEffect } from "react";
import "../App.css";
import ProgressBar from "@ramonak/react-progress-bar";

const Results = ({ teams }) => {
  const [winningTeam, setWinningTeam] = useState([]);
  const [animatedTeams, setAnimatedTeams] = useState([]);

  const maxScore = Math.max(...teams.map((team) => team.correctAnswers));

  const isWiningTeam = (teamName) => {
    return winningTeam.some(function (team) {
      return team.name === teamName;
    });
  };

  useEffect(() => {
    setWinningTeam(teams.filter((team) => team.correctAnswers === maxScore));
    setAnimatedTeams(teams.map(() => 0));
  }, [maxScore, teams]);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimatedTeams((prev) =>
        prev.map((current, index) => {
          if (current < teams[index].correctAnswers) {
            return current + 1;
          }
          return current;
        })
      );
    }, 250);

    if (
      animatedTeams.every(
        (current, index) => current >= teams[index].correctAnswers
      )
    ) {
      clearInterval(animationInterval);
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [animatedTeams, teams]);

  const getLabelOnDelay = (value, index) => {
    if (winningTeam.length) {
      return value === animatedTeams[index] ? value.toString() : "";
    }
    return "";
  };

  return (
    <div className="results-container">
      <h1>Results-</h1>
      <div className="results">
        {teams.map((team, index) => (
          <div key={index}>
            {winningTeam.length && (
              <div className="progress-bar">
                <ProgressBar
                  completed={animatedTeams[index]}
                  maxCompleted={
                    winningTeam[0].correctAnswers + winningTeam[0].passAnswers
                  }
                  customLabel={getLabelOnDelay(animatedTeams[index], index)}
                  transitionDuration={"2s"}
                  //   className="progress-bar"
                  baseBgColor={"#FFFFFF"}
                  height="45px"
                  width="300px"
                  barContainerClassName="progress-bar-container"
                  bgColor={isWiningTeam(team.name) ? "#FFD700" : "#c0c0c0"}
                  labelAlignment="left"
                />
                <p>{team.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
