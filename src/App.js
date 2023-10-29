import React, { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";

import TimerComponent from "./cmps/TimerComponent";
import SettingsComponent from "./cmps/SettingsComponent";
import AlphabetRunner from "./cmps/AlphaBetRunner";
import Results from "./cmps/Results";

import "./App.css";

import catagoriesContent from "./catagories.json";

function App() {
  const [teams, setTeams] = useState([]);
  const [settingsDone, setSettingsDone] = useState(false);
  const [remainingTime, setRemainingTime] = useState(6);
  const [gameOn, SetGameOn] = useState(false);
  const [letters, setLetters] = useState("אבגדהוזחטיכלמנסעפצקרשת");
  const [letterChosen, setLetterChosen] = useState(null);
  const [TeamChosenIndex, setTeamChosenIndex] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [firstTeamChosen, SetFirstTeamChosen] = useState(null);
  const [catagories, setCatagories] = useState([]);
  const [currentCatagory, setCurrentCatagory] = useState(null);
  const [cardFleshed, setCardsFleshed] = useState([]);
  const [cardClassName, setCardClassName] = useState("");
  const [endGame, setEndGame] = useState(false);

  const nextTurnRangeRef = useRef(null);
  const endGameRangeRef = useRef(null);

  const shuffleArray = (array) => {
    let shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  };
  const handlers = useSwipeable({
    onSwiped: (e) => {
      console.log(e);
      console.log("Swiped in the direction of", e.dir);
      handleClassName(e.dir);
      handleSwipe(e.dir);
    },
    delta: { right: 5, left: 5 },
    swipeDuration: 150,
  });

  const handleClassName = (dir) => {
    dir === "Right" ? setCardClassName("right") : setCardClassName("left");
    setTimeout(() => {
      setCardClassName("");
    }, 300);
  };

  const ChooseRandomTeam = () => {
    let randomIndexForTeams = Math.floor(Math.random() * teams.length);
    setTeamChosenIndex(randomIndexForTeams);
    teams[randomIndexForTeams].isCurrentTeam = true;
    teams[randomIndexForTeams].playedThisRound = true;
    setCurrentTeam(teams[randomIndexForTeams]);
    SetFirstTeamChosen(teams[randomIndexForTeams]);
    // console.log(teams[randomIndex]);
    return teams[randomIndexForTeams].name;
  };

  const getNextTeam = () => {
    const nextIndex = (TeamChosenIndex + 1) % teams.length;
    setTeamChosenIndex(nextIndex);
    setCurrentTeam(teams[nextIndex]);
    if (teams[nextIndex].playedThisRound === true) {
      teams.forEach((team) => {
        team.playedThisRound = false;
      });
      setTeams(teams);
      ChooseRandomTeam();
      setLetterChosen(null);
    }
  };

  const handleSettingsDone = () => {
    // Perform actions when settings are done, e.g., start the game
    console.log("Settings are done:", teams);
    setSettingsDone(true); // Update state to indicate settings are done
  };

  const handleSwipe = (direction) => {
    let currCatagory = catagories.shift();
    setCurrentCatagory(currCatagory);
    if (!catagories.length) {
      setCatagories(catagories);
    }
    if (!catagories.length) {
      getCatagories();
      console.log("from here?");
    }
    if (direction === "Right") {
      currentTeam.correctAnswers++;
    } else if (direction === "Left") {
      currentTeam.passAnswers++;
    }
    setCurrentTeam(currentTeam);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value);

    if (newValue === parseInt(event.target.max)) {
      console.log("im at the end!");
      playNextRound();
    } else if (newValue === parseInt(event.target.min)) {
      console.log("im at the start");
      setEndGame(true);
    }
  };

  const playNextRound = () => {
    getNextTeam();
    SetGameOn(false);
  };

  const handleGameStart = () => {
    SetGameOn(true);
    if (!currentCatagory) {
      let newCatagory = catagories.shift();
      setCurrentCatagory(newCatagory);
      setCatagories(catagories);
    }
    console.log("time is done");
  };

  const getCatagories = () => {
    setCatagories(shuffleArray(catagoriesContent.lines));
    if (!currentCatagory) {
      setCurrentCatagory(catagories[0]);
    }
  };

  useEffect(() => {
    if (!catagories.length) {
      console.log("out of catagoriews!");
      getCatagories();
    }
    if (settingsDone) {
      ChooseRandomTeam();
    }
  }, [settingsDone]);

  useEffect(() => {
    if (gameOn) {
      const nextTurnRangeElement = nextTurnRangeRef.current;
      const endGameRaneElement = endGameRangeRef.current;
      console.log("now im rendering");

      if (nextTurnRangeElement) {
        // Set the initial value to 0
        nextTurnRangeElement.value = 0;
        endGameRaneElement.value = 100;
      }
    }
  }, [gameOn]);

  return (
    <div className="App">
      {!settingsDone ? (
        <SettingsComponent
          teams={teams}
          setTeams={setTeams}
          handleSettingsDone={handleSettingsDone}
        />
      ) : (
        ""
      )}
      {!letterChosen && settingsDone && (
        <AlphabetRunner
          setLetters={setLetters}
          letters={letters}
          letterChosen={letterChosen}
          setLetterChosen={setLetterChosen}
        />
      )}
      {!gameOn && settingsDone && letterChosen && (
        <div className="get-ready">
          <TimerComponent
            remainingTime={15}
            handleGameStart={handleGameStart}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "1.5em",
            }}
          >
            הקבוצה הבאה
            <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              {currentTeam.name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "1.5em",
            }}
          >
            אנחנו באות
            <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              {"'" + letterChosen}
            </span>
          </div>
          <p style={{ fontWeight: "bold", fontSize: "1em" }}>...הנה זה בא</p>
        </div>
      )}
      {settingsDone && gameOn && !endGame && (
        <div className="game-container">
          <div className="timer">
            <TimerComponent
              remainingTime={60}
              handleGameStart={handleGameStart}
            />
          </div>
          <div {...handlers} className={`card ${cardClassName}`}>
            <p>{currentCatagory}</p>
          </div>
          <p style={{ margin: "0", fontWeight: "bold", fontSize: "1.2em" }}>
            {currentTeam.name}
          </p>
          <label className="input-label">
            <span>Swipe to Jump Turn</span>
            <input
              className="end-turn-range"
              type="range"
              ref={nextTurnRangeRef}
              min={0}
              max={100}
              onChange={handleRangeChange}
            />
            <span>Swipe to end game</span>
            <input
              className="end-game-range"
              type="range"
              ref={endGameRangeRef}
              min={0}
              max={100}
              onChange={handleRangeChange}
            />
          </label>
          {/* <button onClick={() => playNextRound()}>Start Nexr Round</button> */}
          {/* <button onClick={() => setEndGame(true)}>end Game</button> */}
        </div>
      )}
      {endGame && <Results teams={teams} />}
    </div>
  );
}

export default App;
